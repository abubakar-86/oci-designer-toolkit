/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

const { app, BrowserWindow, ipcMain, screen } = require("electron")
const path = require("path")
const url = require("url")
const fs = require("fs")
// const { handleLoadOciConfigProfiles } = require ("./electron/OcdApi")
// const { ConfigFileReader } = require ('oci-common')
const common = require ('oci-common')
const { OciQuery, OciReferenceDataQuery } = require('@ocd/query')

// if (require('electron-squirrel-startup')) app.quit()
const ocdConfigDirectory = path.join(app.getPath('home'), '.ocd')
const ocdConsoleConfigFilename = path.join(ocdConfigDirectory, 'console_config.json')
const ocdWindowStateFilename = path.join(ocdConfigDirectory, 'desktop.json')
if (!fs.existsSync(ocdConfigDirectory)) fs.mkdirSync(ocdConfigDirectory)

const loadDesktopState = () => {
	const size = screen.getPrimaryDisplay().workAreaSize
	const initialState = {
		x: undefined,
		y: undefined,
		width: Math.round(size.width / 2),
		height: Math.round((size.height / 3) * 2),
		isMaximised: false
	}
	if (!fs.existsSync(ocdWindowStateFilename)) fs.writeFileSync(ocdWindowStateFilename, JSON.stringify(initialState, null, 4))
	const config = fs.readFileSync(ocdWindowStateFilename, 'utf-8')
	return JSON.parse(config) 
}

const saveDesktopState = (config) => {
	fs.writeFileSync(ocdWindowStateFilename, JSON.stringify(config, null, 4))
}

const createWindow = () => {
	let desktopState = loadDesktopState()
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		x: desktopState.x,
		y: desktopState.y,
		width: desktopState.width,
		height: desktopState.height,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js')
		},
	})

	const saveState = () => {
		desktopState.isMaximised = mainWindow.isMaximized()
		const bounds = mainWindow.getBounds()
		if (!mainWindow.isMaximized()) desktopState = {...desktopState, ...bounds}
		saveDesktopState(desktopState)
	}

	// mainWindow.on('move', (e) => console.debug('Move Event'))
	mainWindow.on('moved', (e) => saveState())
	// mainWindow.on('resize', (e) => console.debug('Resize Event'))
	mainWindow.on('resized', (e) => saveState())
	mainWindow.on('close', (e) => saveState())

	// and load the index.html of the app.
	const startUrl =
		process.env.WEB_URL ||
		url.format({
			pathname: path.join(__dirname, "../build/index.html"),
			protocol: "file",
			slashes: true,
		})
	mainWindow.loadURL(startUrl)

	if (desktopState.isMaximised) mainWindow.maximize()

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
	ipcMain.handle('ociConfig:loadProfiles', handleLoadOciConfigProfiles)
	ipcMain.handle('ociQuery:listRegions', handleListRegions)
	ipcMain.handle('ociQuery:listTenancyCompartments', handleListTenancyCompartments)
	ipcMain.handle('ociQuery:queryTenancy', handleQueryTenancy)
	ipcMain.handle('ociQuery:queryDropdown', handleQueryDropdown)
	ipcMain.handle('ociExport:exportTerraform', handleExportTerraform)
	ipcMain.handle('ocdConfig:loadConsoleConfig', handleLoadConsoleConfig)
	ipcMain.handle('ocdConfig:saveConsoleConfig', handleSaveConsoleConfig)
	createWindow()
	app.on('activate', function () {
	  if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
  })
  
  
// app.on("ready", createWindow)

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})

// app.on("activate", () => {
// 	// On OS X it's common to re-create a window in the app when the
// 	// dock icon is clicked and there are no other windows open.
// 	if (BrowserWindow.getAllWindows().length === 0) {
// 		createWindow()
// 	}
// })

// TODO: Remove Temp solution to work around permission issues with FileSystemFileHandle.createWritable() in Menu.ts Save As
app.commandLine.appendSwitch("enable-experimental-web-platform-features")
console.debug(app.getPath('home'))
console.debug(app.getPath('userData'))

/*
** Electron IPC Handlers required for the OCD Desktop.
*/

async function handleLoadOciConfigProfiles() {
	console.debug('Electron Main: handleLoadOciConfigProfiles')
	return new Promise((resolve, reject) => {
		const parsed = common.ConfigFileReader.parseDefault(null)
		// console.debug('Electron Main: handleLoadOciConfigProfiles', parsed)
		// console.debug('Electron Main: handleLoadOciConfigProfiles', parsed.accumulator.configurationsByProfile)
		// console.debug('Electron Main: handleLoadOciConfigProfiles', Array.from(parsed.accumulator.configurationsByProfile.keys()))
        const profiles = Array.from(parsed.accumulator.configurationsByProfile.keys())
		resolve(profiles)
	})
}

async function handleListRegions(event, profile) {
	console.debug('Electron Main: handleListRegions')
	const ociQuery = new OciQuery(profile)
	return ociQuery.listRegions()
}

async function handleListTenancyCompartments(event, profile) {
	console.debug('Electron Main: handleListTenancyCompartments')
	const ociQuery = new OciQuery(profile)
	return ociQuery.listTenancyCompartments()
}

async function handleQueryTenancy(event, profile, compartmentIds, region) {
	console.debug('Electron Main: handleQueryTenancy')
	const ociQuery = new OciQuery(profile, region)
	return ociQuery.queryTenancy(compartmentIds)
}

async function handleQueryDropdown(event, profile, region) {
	console.debug('Electron Main: handleQueryDropdown')
	const ociQuery = new OciReferenceDataQuery(profile, region)
	return ociQuery.query()
}

async function handleExportTerraform(event, design, directory) {
	console.debug('Electron Main: handleExportTerraform')
	return new Promise((resolve, reject) => {reject('Currently Not Implemented')})
}

async function handleLoadConsoleConfig(event) {
	console.debug('Electron Main: handleLoadConfig')
	return new Promise((resolve, reject) => {
		const defaultConfig = {
            showPalette: true,
            showModelPalette: true,
            showProvidersPalette: ['oci'],
            verboseProviderPalette: false,
            displayPage: 'designer',
            detailedResource: true,
            showProperties: true,
            highlightCompartmentResources: false
        }
		// if (!fs.existsSync(ocdConfigDirectory)) fs.mkdirSync(ocdConfigDirectory)
		console.debug('Load Console Config: ', ocdConsoleConfigFilename)
		try {
			if (!fs.existsSync(ocdConsoleConfigFilename)) fs.writeFileSync(ocdConsoleConfigFilename, JSON.stringify(defaultConfig, null, 4))
			const config = fs.readFileSync(ocdConsoleConfigFilename, 'utf-8')
			resolve(JSON.parse(config))
		} catch (err) {
			reject(err)
		}
	})
}

async function handleSaveConsoleConfig(event, config) {
	console.debug('Electron Main: handleLoadConfig')
	return new Promise((resolve, reject) => {
		// if (!fs.existsSync(ocdConfigDirectory)) fs.mkdirSync(ocdConfigDirectory)
		console.debug('Save Console Config: ', ocdConsoleConfigFilename)
		try {
			fs.writeFileSync(ocdConsoleConfigFilename, JSON.stringify(config, null, 4))
			resolve(config)
		} catch (err) {
			reject(err)
		}
	})
}
