/*
** Copyright (c) 2021, Andrew Hopkinson.
** Licensed under the GNU GENERAL PUBLIC LICENSE v 3.0 as shown at https://www.gnu.org/licenses/.
*/

import { v4 as uuidv4 } from 'uuid'
import * as ociResources from '../model/provider/oci/resources'
import { OcdDesign, OcdViewPage, OcdViewCoords, OcdViewLayer, OcdBaseModel } from '../model/OcdDesign'
import { PaletteResource } from '../model/OcdPalette'
import { OcdResource } from '../model/OcdResource'
import { OcdAutoLayout } from './OcdAutoLayout'

export interface OcdSelectedResource {
    modelId: string
    pageId: string
    coordsId: string
    class: string
}

export class OcdDocument {
    design: OcdDesign
    selectedResource: OcdSelectedResource
    constructor(design?: string | OcdDesign, resource?: OcdSelectedResource) {
        if (typeof design === 'string' && design.length > 0) this.design = JSON.parse(design)
        else if (design instanceof Object) this.design = design
        else this.design = this.newDesign()
        this.selectedResource = resource ? resource : this.newSelectedResource()
    }

    static new = () => new OcdDocument()

    static clone = (ocdDocument:OcdDocument) => new OcdDocument(ocdDocument.design, ocdDocument.selectedResource)

    newDesign = (): OcdDesign => OcdDesign.newDesign()

    newSelectedResource(): OcdSelectedResource {
        return {
            modelId: '',
            pageId: '',
            coordsId: '',
            class: 'ocd-image'
        }
    }
    getSelectedResource = () => this.getResource(this.selectedResource.modelId)
    getSelectedResourceCoords = () => this.getCoords(this.selectedResource.coordsId)

    getOciResourceList(key: string) {return this.design.model.oci.resources[key] ? this.design.model.oci.resources[key] : []}
    getOciResources() {return Object.values(this.design.model.oci.resources).filter((val) => Array.isArray(val)).reduce((a, v) => [...a, ...v], [])}
    getResources() {return this.getOciResources()}
    getResource(id='') {return this.getResources().find((r: any) => r.id === id)}
    addResource(paletteResource: PaletteResource, compartmentId: string) {
        const resourceList = paletteResource.class.split('-').slice(1).join('_')
        const resourceClass = paletteResource.class.toLowerCase().split('-').map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('')
        const resourceNamespace: string = `${resourceClass}Model`
        const resourceClient: string = `${resourceClass}Client`
        console.info('List:', resourceList, 'Class:', resourceClass, 'Client:', resourceClient)
        console.info(`ociResource`, ociResources)
        let modelResource = undefined
        if (paletteResource.provider === 'oci') {
            modelResource = {id: `ocd-${paletteResource.class}-${uuidv4()}`}
            // @ts-ignore 
            const client = ociResources[resourceNamespace]
            if (client) {
                modelResource = client.newResource()
                modelResource.compartmentId = compartmentId
                console.info(modelResource)
                this.design.model.oci.resources[resourceList] ? this.design.model.oci.resources[resourceList].push(modelResource) : this.design.model.oci.resources[resourceList] = [modelResource]
            } else {
                alert(`Resource ${resourceClass} has not yet been implemented.`)
            }
        }
        console.info('Added Resource:', modelResource)
        return modelResource
    }
    removeResource(id: string) {
        // Delete from Model
        Object.values(this.design.model).forEach((provider: OcdBaseModel) => Object.entries(provider.resources).forEach(([k, v]) => provider.resources[k] = v.filter((r: OcdResource) => r.id !== id)))
        // Remove from Views
        this.design.view.pages.forEach((page: OcdViewPage) => {
            const pageResources = page.coords.filter((coords: OcdViewCoords) => coords.ocid === id)
            pageResources.forEach((coords: OcdViewCoords) => this.removeCoords(coords, page.id))
        })
    }
    getDisplayName(id: string): string {
        const resource = this.getResource(id)
        return resource ? resource.name ? resource.name : resource.displayName : ''
    }
    setDisplayName(id: string, displayName: string) {
        const resource = this.getResource(id)
        if (resource) {
            resource.name = displayName
            resource.displayName = displayName
        }
    }

    // @ts-ignore 
    getPage = (id: string): OcdViewPage => this.design.view.pages.find((v) => v.id === id)
    // @ts-ignore 
    getActivePage = (): OcdViewPage => this.design.view.pages.find((p: OcdViewPage) => p.selected)
    // @ts-ignore 
    setPageTitle = (id: string, title: string): void => this.design.view.pages.find((v) => v.id === id).title = title
    addPage(): OcdViewPage {
        // @ts-ignore 
        const layers = this.design.model.oci.resources.compartment.map((c, i) => {return {id: c.id, class: 'oci-compartment', visible: true, selected: i === 0}})
        const viewPage: OcdViewPage = {
            id: `page-${uuidv4()}`,
            title: `Page ${this.design.view.pages.length + 1}`,
            layers: layers,
            coords: [],
            selected: true
        }
        this.design.view.pages.forEach((p) => p.selected = false)
        this.design.view.pages.push(viewPage)
        console.info(`Pages ${this.design.view.pages}`)
        return viewPage
    }
    removePage(id: string) {
        this.design.view.pages = this.design.view.pages.filter((p) => p.id !== id)
    }

    // @ts-ignore 
    getLayerName = (id: string): string => this.design.model.oci.resources.compartment.find((c) => c.id === id).displayName
    // @ts-ignore 
    getActiveLayer = (pageId: string): OcdViewLayer => this.getActivePage(pageId).layers.find((l: OcdViewLayer) => l.selected)
    addLayer(id: string, layerClass: string = 'oci-compartment') {
        this.design.view.pages.forEach((p: OcdViewPage) => {
            const layer: OcdViewLayer = {
                id: id,
                class: layerClass,
                visible: true,
                selected: false
            } 
            p.layers.push(layer)
        })
    }
    removeLayer(id: string) {
        this.design.view.pages.forEach((p: OcdViewPage) => p.layers = p.layers.filter((l) => l.id !== id))
    }

    getCoords = (id: string) => {return this.design.view.pages.map(p => p.coords).reduce((a, c) => [...a, ...c], []).find(c => c.id === id)}
    addCoords(coords: OcdViewCoords, viewId: string, pgid: string = '') {
        const view: OcdViewPage = this.getPage(viewId)
        if (view) view.coords.push(coords)
    }
    removeCoords(coords: OcdViewCoords, viewId: string, pgid: string = '') {
        const view: OcdViewPage = this.getPage(viewId)
        view.coords = view.coords.filter(c => c !== coords)
    }
    updateCoords(coords: OcdViewCoords, viewId: string) {
        const view: OcdViewPage = this.getPage(viewId)
        let oldCoords: OcdViewCoords | undefined = view.coords.find(c => c.id === coords.id)
        if (oldCoords) {
            oldCoords.x = coords.x
            oldCoords.y = coords.y
            oldCoords.w = coords.w
            oldCoords.h = coords.h
        }
    }
    switchCoords = (coords: OcdViewCoords[], idx1: number, idx2: number) => [coords[idx1], coords[idx2]] = [coords[idx2], coords[idx1]]
    bringForward = (viewId: string, coordsId: string) => {
        const page = this.getPage(viewId)
        if (page && coordsId !== '') {
            const idx = page.coords.findIndex(c => c.id === coordsId)
            if (idx < page.coords.length - 1) this.switchCoords(page.coords, idx, idx + 1)
        }
    }
    sendBackward = (viewId: string, coordsId: string) => {
        const page = this.getPage(viewId)
        if (page && coordsId !== '') {
            const idx = page.coords.findIndex(c => c.id === coordsId)
            if (idx > 0) this.switchCoords(page.coords, idx, idx - 1)
        }
    }
    toFront = (viewId: string, coordsId: string) => {
        const page = this.getPage(viewId)
        if (page && coordsId !== '') {
            const idx = page.coords.findIndex(c => c.id === coordsId)
            page.coords = [...page.coords.slice(0, idx), ...page.coords.slice(idx + 1), page.coords[idx]]
        }
    }
    toBack = (viewId: string, coordsId: string) => {
        const page = this.getPage(viewId)
        if (page && coordsId !== '') {
            const idx = page.coords.findIndex(c => c.id === coordsId)
            page.coords = [page.coords[idx], ...page.coords.slice(0, idx), ...page.coords.slice(idx + 1)]
        }
    }

    autoLayout = (viewId: string) => {
        const autoArranger = new OcdAutoLayout(this.design)
        const page = this.getPage(viewId)
        page.coords = autoArranger.layout()
    }

}

export default OcdDocument