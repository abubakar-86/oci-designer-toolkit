/*
** Copyright (c) 2020, 2024, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
// TODO: Remove Following
// @ts-nocheck

import fs from 'fs'
import path from 'path'
import { OcdCodeGenerator } from './OcdCodeGenerator.js'

export class OcdBuildDateGenerator extends OcdCodeGenerator {
    constructor () {
        super()
    }

    generate(resource: string, schema) {}
    content = (resource, schema) => {return ''}
    autoGeneratedContent = (resource, schema) => {return ''}

    writeFiles(outputDirectory: string, resource: string, force = false) {
        const outputFilename = 'OcdBuildDetails.ts'
        const resourceFilename = path.join(outputDirectory, outputFilename)
        console.debug('Build Details')
        // Read package.json specified in resource
        const data = fs.readFileSync(resource, 'utf8')
        const packageJson = JSON.parse(data)
        const content = `${this.copyright()}
${this.autoGeneratedWarning()}

export const buildDetails: Record<string, string> = {
    version: '${packageJson.version}',
    date: '${new Date(Date.now()).toLocaleDateString()}',
    time: '${new Date(Date.now()).toLocaleTimeString()}',
    datetime: '${new Date(Date.now()).toLocaleString()}',
    utc: '${new Date(Date.now()).toUTCString()}'
}

export default buildDetails

`
        if (force || !fs.existsSync(resourceFilename)) {
            console.info(`Writting Resource File : ${resourceFilename}`)
            fs.writeFileSync(resourceFilename, content)
        } else {
            console.info(`Resource File already exists : ${resourceFilename}`)
        }
    }
    writeResourceFiles(outputDirectory: string, resource: string, force = false) {}
    writeGeneratedResourceFiles(outputDirectory: string, resource: string, force = false) {}
}

export default OcdBuildDateGenerator
module.exports = { OcdBuildDateGenerator }
