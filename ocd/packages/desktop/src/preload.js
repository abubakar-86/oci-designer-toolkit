/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ocdAPI', {
	// OCI API Calls / Query
  loadOCIConfigProfiles: () => ipcRenderer.invoke('ociConfig:loadProfiles'),
  listRegions: (profile) => ipcRenderer.invoke('ociQuery:listRegions', profile),
  listTenancyCompartments: (profile) => ipcRenderer.invoke('ociQuery:listTenancyCompartments', profile),
  queryTenancy: (profile, compartmentIds, region) => ipcRenderer.invoke('ociQuery:queryTenancy', profile, compartmentIds, region),
  queryDropdown: (profile, region) => ipcRenderer.invoke('ociQuery:queryDropdown', profile, region),
	// OCD Design 
  loadDesign: (design, filename) => ipcRenderer.invoke('ocdDesign:loadDesign', filename),
  saveDesign: (design, filename) => ipcRenderer.invoke('ocdDesign:saveDesign', design, filename),
  exportTerraform: (design, directory) => ipcRenderer.invoke('ocdDesign:exportTerraform', design, directory),
	// OCD Configuration
  loadConsoleConfig: () => ipcRenderer.invoke('ocdConfig:loadConsoleConfig'),
  saveConsoleConfig: (config) => ipcRenderer.invoke('ocdConfig:saveConsoleConfig', config),
})

console.debug('Preload script')
