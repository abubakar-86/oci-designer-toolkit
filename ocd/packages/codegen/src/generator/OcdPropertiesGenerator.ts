/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
// TODO: Remove Following
// @ts-nocheck

import fs from 'fs'
import path from 'path'
import { OcdCodeGenerator } from './OcdCodeGenerator.js'

export class OcdPropertiesGenerator extends OcdCodeGenerator {
    constructor () {
        super()
        this.ignoreAttributes = [...this.commonElements, ...this.commonIgnoreElements]
    }

    generate(resource, schema) {
        super.generate(resource, schema)
        this.resourceConfigFile = this.configContent(resource, schema)
        this.resourceProxyFile = this.proxyContent(resource, schema)
    }

    writeFiles(outputDirectory, resource, force = false) {
        super.writeFiles(outputDirectory, resource, force)
        // Config Files
        const configOutputFilename = this.configFilename(resource)
        const configDirectory = path.join(outputDirectory, this.resourcesDirectory(resource), this.configsDirectory(resource))
        const configFilename = path.join(configDirectory, configOutputFilename)
        // console.info(`Resource Directory : ${configDirectory}`)
        if (!fs.existsSync(configDirectory)) fs.mkdirSync(configDirectory, {recursive: true})
        if (!fs.existsSync(configFilename)) {
            console.info(`Writting Config File : ${configFilename}`)
            fs.writeFileSync(configFilename, this.resourceConfigFile)
        } else {
            console.info(`Config File already exists : ${configFilename}`)
        }
        // Proxy Files
        const proxyOutputFilename = this.proxyFilename(resource)
        const proxyDirectory = path.join(outputDirectory, this.resourcesDirectory(resource), this.proxiesDirectory(resource))
        const proxyFilename = path.join(proxyDirectory, proxyOutputFilename)
        // console.info(`Resource Directory : ${proxyDirectory}`)
        if (!fs.existsSync(proxyDirectory)) fs.mkdirSync(proxyDirectory, {recursive: true})
        if (!fs.existsSync(proxyFilename)) {
            console.info(`Writting Proxy File : ${proxyFilename}`)
            fs.writeFileSync(proxyFilename, this.resourceProxyFile)
        } else {
            console.info(`Proxy File already exists : ${proxyFilename}`)
        }
    }

    /*
    ** Content for the top level file. This will only be created if it does not exists.
    */
    content = (resource, schema) => {
        const schemaObjects = this.getSchemaObjects(schema)
        const content = `${this.copyright()}

import OcdDocument from '../../../../OcdDocument'
import { ResourceElementConfig, ResourceProperties } from '../../../OcdPropertyTypes'
import * as AutoGenerated from './${this.generatedDirectory()}/${this.reactResourceName(resource)}'
import { ${this.configNamespace(resource)} } from './${this.configsDirectory()}/${this.reactResourceName(resource)}'

export const ${this.reactResourceName(resource)} = ({ ocdDocument, setOcdDocument, resource }: ResourceProperties): JSX.Element => {
    const configs: ResourceElementConfig[] = ${this.configNamespace(resource)}.configs()
    return (
        <AutoGenerated.${this.reactResourceGeneratedName(resource)} ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} configs={configs} />
    )
}
`
        return content
    }

    /*
    ** Content for the auto generated file this will be written on each execution.
    */
    autoGeneratedContent = (resource, schema) => {
        const schemaObjects = this.getSchemaObjects(schema)
        const schemaAttributes = this.getSchemaAttributes(schema)
        // console.info('Schema Objects', schemaObjects)
        // console.info('Schema Attributes', schemaAttributes)
        const content = `${this.copyright()}
${this.autoGeneratedWarning()}
/* eslint-disable @typescript-eslint/no-unused-vars */

import { v4 as uuidv4 } from 'uuid'
import OcdDocument from '../../../../../OcdDocument'
import { GeneratedResourceProperties, GeneratedResourceRootProperties, OcdBooleanProperty, OcdCacheLookupProperty, OcdCodeProperty, OcdListProperty, OcdLookupProperty, OcdLookupListProperty, OcdMapProperty, OcdNumberProperty, OcdNumberListProperty, OcdSetLookupProperty, OcdSetProperty, OcdStaticLookupProperty, OcdStringListProperty, OcdTextProperty, ResourceProperty, isPropertyDisplayConditionTrue} from '../../../../OcdPropertyTypes'
import { OciModelResources as Model } from '@ocd/model'
import { useState } from 'react'

export const ${this.reactResourceGeneratedName(resource)} = ({ ocdDocument, setOcdDocument, resource, configs, additionalElements = [], summaryTitle = 'Resource', onDelete = undefined }: GeneratedResourceRootProperties): JSX.Element => {
    const rootResource = resource
    const className = onDelete === undefined ? 'summary-background' : 'summary-background ocd-summary-row'
    const deleteClassName = onDelete === undefined ? 'hidden' : 'delete-property action-button-background action-button-column action-button'
    const open = true
    const [title, setTitle] = useState(summaryTitle ? typeof summaryTitle === 'string' ? summaryTitle : summaryTitle(resource, open) : 'Resource')
    const onDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        e.preventDefault()
        if (onDelete) onDelete(resource)
    }
    const onToggle = (e: React.MouseEvent<HTMLDetailsElement>) => {
        e.stopPropagation()
        e.preventDefault()
        // @ts-ignore
        if (typeof summaryTitle === 'function') setTitle(summaryTitle(resource, e.target.open))
    }
    return (
        <div>
            <details open={true} onToggle={onToggle}>
                <summary className={className}><div>{title}</div><div className={deleteClassName} onClick={onDeleteClick}></div></summary>
                <div className='ocd-resource-properties'>
                    ${Object.entries(schema.attributes).filter(([k, v]) => !this.ignoreAttributes.includes(k)).map(([k, a]) => this.attributeToReactElement(resource, k, a)).join('\n                    ')}
                </div>
            </details>
        </div>
    )
}

${schemaObjects.map(i => this.reactComplextElement(resource, i)).filter(i => i.trim() !== '').join('')}

${schemaAttributes.filter(a => !this.ignoreAttributes.includes(a.name)).map(i => this.reactSimpleElement(resource, i)).filter(i => i.trim() !== '').join('')}
`
        return content
    }

    /*
    ** Content of the Properties Config file.
    */

    configContent = (resource, schema) => {
        const schemaObjects = this.getSchemaObjects(schema)
        const content = `${this.copyright()}

import { ResourceElementConfig } from "../../../../OcdPropertyTypes"
import { OciCommonConfigs } from "../../OciCommonConfigs"

export namespace ${this.configNamespace(resource)} {
    export function configs(): ResourceElementConfig[] {return [...OciCommonConfigs.configs()]}
}
`
        return content
    }

    /*
    ** Content of the Properties Procy file.
    */

    proxyContent = (resource, schema) => {
        const schemaObjects = this.getSchemaObjects(schema)
        const content = `${this.copyright()}

import { OcdCacheData } from '../../../../../OcdCache'
import { OcdDocument } from '../../../../../OcdDocument'
import { OciModelResources as Model } from '@ocd/model'

export namespace ${this.proxyNamespace(resource)} {
    export function proxyHandler(ocdDocument: OcdDocument, ocdCache: OcdCacheData)  {
        const proxyHandler = {
            //@ts-ignore
            get(obj, prop) {
                if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                  return new Proxy(obj[prop], proxyHandler)
                } else {
                  return obj[prop];
                }
            }
        }
        return proxyHandler
    }
    export function proxyResource(ocdDocument: OcdDocument, resource: Model.${this.interfaceName(resource)}, ocdCache: OcdCacheData) {
        const pH = proxyHandler(ocdDocument, ocdCache)
        const proxyResource = new Proxy<Model.${this.interfaceName(resource)}>(resource, pH)
        return proxyResource
    }
}
`
        return content
    }

    /*
    ** Content for the auto generated resource summary file this will be written on each execution.
    */
    resourcesFileContent(resources) {
        // , ...this.resourceObjects[r]
        const contents = `${this.copyright()}
${this.autoGeneratedWarning()}

${resources.sort().map((r) => `export { ${this.namespaceName(r)} } from './${this.resourcesDirectory()}/${this.resourceName(r)}'`).join('\n')}

${resources.sort().map((r) => `export { ${this.configNamespace(r)} } from './${this.resourcesDirectory()}/configs/${this.resourceName(r)}'`).join('\n')}

${resources.sort().map((r) => `export { ${this.proxyNamespace(r)} } from './${this.resourcesDirectory()}/proxies/${this.resourceName(r)}'`).join('\n')}
    `
            return contents
    }

    attributeToReactElement = (resource, name, attribute) => {
        const configFind = `configs.find((c) => c.id === '${attribute.id}')`
        const additionalElement = `{additionalElements && additionalElements.find((a) => a.afterElement === '${attribute.name}') && additionalElements.find((a) => a.afterElement === '${attribute.name}')?.jsxElement({ocdDocument, setOcdDocument, resource, configs, rootResource})}`
        let elementJSX = ''
        if (attribute.type === 'string' && attribute.lookup)                  elementJSX =  `<${this.reactSimpleName(attribute.name)} ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} configs={configs} rootResource={rootResource} />`
        else if (attribute.type === 'string')                                 elementJSX =  `<${this.reactSimpleName(attribute.name)} ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} configs={configs} rootResource={rootResource} />`
        else if (attribute.type === 'bool')                                   elementJSX =  `<${this.reactSimpleName(attribute.name)} ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} configs={configs} rootResource={rootResource} />`
        else if (attribute.type === 'number')                                 elementJSX =  `<${this.reactSimpleName(attribute.name)} ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} configs={configs} rootResource={rootResource} />`
        else if (attribute.type === 'object')                                 elementJSX =  `{isPropertyDisplayConditionTrue(${attribute.conditional}, ${JSON.stringify(attribute.condition)}, resource, rootResource) && <${this.reactObjectName(attribute.name)} ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource['${attribute.key}']} configs={configs} rootResource={rootResource} additionalElements={additionalElements} />}`
        else if (attribute.type === 'object')                                 elementJSX =  `<${this.reactObjectName(attribute.name)} ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource['${attribute.key}']} configs={configs} rootResource={rootResource} additionalElements={additionalElements} />`
        else if (attribute.type === 'list' && attribute.subtype === 'object') elementJSX =  `<${this.reactObjectListName(attribute.name)} ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource['${attribute.key}']} configs={configs} rootResource={rootResource} additionalElements={additionalElements} />`
        else if (attribute.type === 'list' && attribute.subtype === 'string') elementJSX =  `<${this.reactSimpleName(attribute.name)} ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} configs={configs} rootResource={rootResource} />`
        // else if (attribute.type === 'list' && attribute.subtype === 'string') return `<OcdStringListProperty ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} />`
        else if (attribute.type === 'list')                                   elementJSX =  `<OcdListProperty       ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        else if (attribute.type === 'set')                                    elementJSX =  `<${this.reactSimpleName(attribute.name)} ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} configs={configs} rootResource={rootResource} />`
        // else if (attribute.type === 'set')                                    return `<OcdSetProperty        ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} />`
        else if (attribute.type === 'set' && attribute.lookup)                elementJSX =  `<OcdSetLookupProperty  ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        else if (attribute.type === 'map')                                    elementJSX =  `<OcdMapProperty        ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        // return elementJSX
        return `${elementJSX}\n                    ${additionalElement}`
    }

    reactSimpleElementType = (resource, name, attribute) => {
        const configFind = `configs.find((c) => c.id === '${attribute.id}')`
        if (attribute.type === 'string' && attribute.staticLookup)            return `<OcdStaticLookupProperty ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        if (attribute.type === 'string' && attribute.cacheLookup)             return `<OcdCacheLookupProperty  ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        else if (attribute.type === 'string' && attribute.lookup)             return `<OcdLookupProperty       ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        else if (attribute.type === 'string' && attribute.subtype === 'code') return `<OcdCodeProperty         ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        else if (attribute.type === 'string')                                 return `<OcdTextProperty         ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        else if (attribute.type === 'bool')                                   return `<OcdBooleanProperty      ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        else if (attribute.type === 'number')                                 return `<OcdNumberProperty       ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        else if (attribute.type === 'list' && attribute.lookup)               return `<OcdLookupListProperty   ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        else if (attribute.type === 'list' && attribute.subtype === 'string') return `<OcdStringListProperty   ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        else if (attribute.type === 'list' && attribute.subtype === 'number') return `<OcdNumberListProperty   ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        else if (attribute.type === 'set' && attribute.lookup)                return `<OcdSetLookupProperty    ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
        else if (attribute.type === 'set')                                    return `<OcdSetProperty          ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={resource} config={${configFind}} attribute={${JSON.stringify(attribute)}} rootResource={rootResource} />`
    }

    reactSimpleElement = (resource, attribute) => {
        const simpleTypes = ['string', 'bool', 'number']
        const groupTypes = ['list', 'set']
        if (simpleTypes.includes(attribute.type) || (groupTypes.includes(attribute.type) && simpleTypes.includes(attribute.subtype))) {
            return `
export const ${this.reactSimpleName(attribute.name)} = ({ ocdDocument, setOcdDocument, resource, configs, rootResource }: GeneratedResourceProperties): JSX.Element => {
    return (
        ${this.reactSimpleElementType(resource, attribute.name, attribute)}
    )
}
`
        } else return ''
    }

    reactComplextElement = (resource, attribute) => {
        if (attribute.type === 'object') return this.reactObjectElement(resource, attribute)
        else if (attribute.type === 'list' && attribute.subtype === 'object') return this.reactObjectListElement(resource, attribute)
        else return ``
    }

    reactObjectElement = (resource, attribute) => {
        return `
export const ${this.reactObjectName(attribute.name)} = ({ ocdDocument, setOcdDocument, resource, configs, rootResource, additionalElements = [] }: GeneratedResourceProperties): JSX.Element => {
    return (
        <div className='ocd-property-row ocd-object-property-row'>
            <details open={true}>
                <summary className='summary-background'>${attribute.label}</summary>
                <div className='ocd-resource-properties'>
                    ${Object.entries(attribute.attributes).filter(([k, v]) => !this.ignoreAttributes.includes(k)).map(([k, a]) => this.attributeToReactElement(resource, k, a)).join('\n                    ')}
                </div>
            </details>
        </div>
    )
}
`
    }

    reactObjectListElement = (resource, attribute) => {
        // console.info('Object List Attribute', attribute)
        let objectLabel = attribute.label.split(' ').at(-1)
        objectLabel = objectLabel.endsWith('s') ? objectLabel.slice(0, -1) : objectLabel
        return `
export const ${this.reactObjectName(attribute.name)} = ({ ocdDocument, setOcdDocument, resource, configs, rootResource, onDelete, additionalElements = [] }: GeneratedResourceProperties): JSX.Element => {
    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        e.preventDefault()
        if (onDelete) onDelete(resource)
    }
    return (
        <div className='ocd-property-row'>
            <details open={true}>
                <summary className='summary-background ocd-summary-row'><div>${objectLabel}</div><div className='delete-property action-button-background action-button-column action-button' onClick={onClick}></div></summary>
                <div className='ocd-resource-properties'>
                    ${Object.entries(attribute.attributes).filter(([k, v]) => !this.ignoreAttributes.includes(k)).map(([k, a]) => this.attributeToReactElement(resource, k, a)).join('\n                    ')}
                </div>
            </details>
        </div>
    )
}
        
export const ${this.reactObjectListName(attribute.name)} = ({ ocdDocument, setOcdDocument, resource, configs, rootResource, additionalElements = [] }: GeneratedResourceProperties): JSX.Element => {
    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        e.preventDefault()
        resource.push(Model.${this.namespaceName(resource)}.${this.namespaceFunctionName(attribute.name)}())
        setOcdDocument(OcdDocument.clone(ocdDocument))
    }
    const onDelete = (child: Model.${this.namespaceName(resource)}.${this.interfaceName(attribute.name)}) => {
        resource.splice(resource.indexOf(child), 1)
        setOcdDocument(OcdDocument.clone(ocdDocument))
    }
    // @ts-ignore 
    resource.forEach((r: Model.${this.namespaceName(resource)}.${this.interfaceName(attribute.name)}) => {if (!r.key) r.key = uuidv4()})
    return (
        <div className='ocd-property-row'>
            <details open={true}>
                <summary className='summary-background ocd-summary-row'><div>${attribute.label}</div><div className='add-property action-button-background action-button-column action-button' onClick={onClick}></div></summary>
                <div className='ocd-resource-properties'>
                    {resource.map((r: Model.${this.interfaceName(resource)}) => {return <${this.reactObjectName(attribute.name)} ocdDocument={ocdDocument} setOcdDocument={(ocdDocument:OcdDocument) => setOcdDocument(ocdDocument)} resource={r} configs={configs} rootResource={rootResource} onDelete={onDelete} key={r.key}/>})}
                </div>
            </details>
        </div>
    )
}`
    }

    reactSimpleName = (name) => `${this.resourceName(name.replaceAll('.', '_'))}`
    reactObjectName = (name) => `${this.resourceName(name)}Object`
    reactObjectListName = (name) => `${this.resourceName(name)}ObjectList`

    reactResourceName = (resource) => this.resourceName(resource)
    reactResourceGeneratedName = (resource) => this.autoGeneratedResourceName(resource)
    outputFilename = (resource) => `${this.propertiesFilename(resource)}.tsx`
    configFilename = (resource) => `${this.propertiesFilename(resource)}.ts`
    proxyFilename = (resource) => `${this.propertiesFilename(resource)}.ts`

    // resourceName = (resource) => `${this.resourcePropertiesName(resource)}`
    // autoGeneratedResourceName = (resource) => `${super.autoGeneratedResourceName(resource)}`
}

export default OcdPropertiesGenerator
module.exports = { OcdPropertiesGenerator }
