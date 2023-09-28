/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

export class OcdTerraformResource {
    idTFResourceMap: Record<string, string> = {}
    constructor(idTFResourceMap={}) {
        this.idTFResourceMap = idTFResourceMap
    }
    isVariable = (data: string | undefined): boolean => data !== undefined && data.startsWith('var.')
    formatVariable = (data: string | undefined): string | undefined => data
    generateReferenceAttribute = (name: string, value: string | undefined, required: boolean) => {
        if (this.isVariable(value)) return `${name} = ${this.formatVariable(value)}`
        else if (required) return `${name} = local.${this.idTFResourceMap[value as string]}_id`
        else if (value && value !== '') return `${name} = local.${this.idTFResourceMap[value]}_id`
        else return `# ${name} = "${value}"`
    }
    generateTextAttribute = (name: string, value: string | undefined, required: boolean) => {
        if (this.isVariable(value)) return `${name} = ${this.formatVariable(value)}`
        else if (required) return `${name} = "${value}"`
        else if (value && value !== '') return `${name} = "${value}"`
        else return `# ${name} = "${value}"`
    }
    generateBooleanAttribute = (name: string, value: string | boolean | undefined, required: boolean) => {
        console.debug('OcdTerraformResource: generateBooleanAttribute:', value, typeof value)
        if (typeof value === 'string' && this.isVariable(value)) return `${name} = ${this.formatVariable(value)}`
        else if (required) return `${name} = ${value}`
        else if (typeof value === 'boolean') return `${name} = ${value}`
        else return `# ${name} = ${value}`
    }
    generateNumberAttribute = (name: string, value: string | number | undefined, required: boolean) => {
        console.debug('OcdTerraformResource: generateNumberAttribute:', value, typeof value)
        if (typeof value === 'string' && this.isVariable(value)) return `${name} = ${this.formatVariable(value)}`
        else if (required) return `${name} = ${value}`
        else if (value && typeof value === 'number') return `${name} = ${value}`
        else return `# ${name} = ${value}`
    }

    // if (attribute.type === 'string')      return `${name} = \\\`\${this.isVariable(resource.${this.toCamelCase(name)}) ? this.formatVariable(resource.${this.toCamelCase(name)}) : "resource.${this.toCamelCase(name)}"}\\\``
    // else if (attribute.type === 'bool')   return `${name} = \${resource.${this.toCamelCase(name)}}`
    // else if (attribute.type === 'number') return `${name} = \${resource.${this.toCamelCase(name)}}`

}

export default OcdTerraformResource
