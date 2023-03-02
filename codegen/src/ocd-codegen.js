/*
** Copyright (c) 2020, 2022, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import fs from 'fs'
import path from 'path'
import { OcdModelGenerator } from './generator/OcdModelGenerator.js'
import { OcdPropertiesGenerator } from './generator/OcdPropertiesGenerator.js'
import { OciTerraformGenerator } from './generator/OciTerraformGenerator.js'
import { OciTerraformSchemaImporter } from './importer/OciTerraformSchemaImporter.js'

const args = process.argv.splice(2)

console.info('')

// Read command as first argument
const command = args[0]
const subcommand = args[1]
if (command.toLocaleLowerCase() === 'generate') {
    if (subcommand.toLocaleLowerCase() === 'oci-model-js' || subcommand.toLocaleLowerCase() === 'oci-properties-js' || subcommand.toLocaleLowerCase() === 'oci-terraform-js') {
        // Source Schema file will be first in the list after command
        const input_filename = args[2]
        const input_data = fs.readFileSync(input_filename, 'utf-8')
        // Generated root directory will be second in the list after command
        const outputDirectory = args[3]
        const schema = JSON.parse(input_data)
        let generator = undefined
        if (subcommand.toLocaleLowerCase() === 'oci-model-js') generator = new OcdModelGenerator()
        else if (subcommand.toLocaleLowerCase() === 'oci-properties-js') generator = new OcdPropertiesGenerator()
        else if (subcommand.toLocaleLowerCase() === 'oci-terraform-js') generator = new OciTerraformGenerator()
        Object.entries(schema).forEach(([key, value]) => {
            generator.generate(key, value)
            const resourceDirectory = path.join(outputDirectory, generator.generateResourcesDirectory(key))
            const resourceFilename = path.join(resourceDirectory, generator.generateClassFilename(key))
            console.info(`Resource Directory : ${resourceDirectory}`)
            console.info(`Resource File : ${resourceFilename}`)
            const generatedDirectory = path.join(outputDirectory, generator.generateResourcesDirectory(key), generator.generateGeneratedDirectory(key))
            const generatedFilename = path.join(generatedDirectory, generator.generateClassFilename(key))
            console.info(`Generated Directory : ${generatedDirectory}`)
            console.info(`Generated Filename : ${generatedFilename}`)
            if (!fs.existsSync(resourceDirectory)) fs.mkdirSync(resourceDirectory, {recursive: true})
            if (!fs.existsSync(generatedDirectory)) fs.mkdirSync(generatedDirectory, {recursive: true})
            fs.writeFileSync(generatedFilename, generator.resourceAutoGeneratedDefinitionFile)
            // fs.writeFileSync(resourceFilename, generator.resourceDefinitionFile)
            if (!fs.existsSync(resourceFilename)) fs.writeFileSync(resourceFilename, generator.resourceDefinitionFile)
        })
        if (generator.resources.length > 0) {
            // console.info(generator.resourceFile)
            const resource_file_name = path.join(outputDirectory, 'resources.ts')
            fs.writeFileSync(resource_file_name, generator.resourceFile)
        }
    } 
} else if (command.toLocaleLowerCase() === 'import') {
        // Source Schema file will be first in the list after command
        const input_filename = args[2]
        const input_data = fs.readFileSync(input_filename, 'utf-8')
        // Generated root directory will be second in the list after command
        const output_filename = args[3]
        const source_schema = JSON.parse(input_data)
        let importer = undefined
        if (subcommand.toLocaleLowerCase() === 'terraform-schema') importer = new OciTerraformSchemaImporter()
        importer.convert(source_schema)
        fs.writeFileSync(output_filename, JSON.stringify(importer.ocd_schema, null, 2))
}
