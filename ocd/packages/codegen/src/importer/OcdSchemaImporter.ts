/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdSchema } from "../types/OcdSchema"
import { TerraformSchema } from "../types/TerraformSchema"
import { OcdUtils } from '@ocd/core'

export class OcdSchemaImporter {
    ocd_schema: OcdSchema
    constructor() {
        this.ocd_schema = {}
    }

    convert(source_schema: TerraformSchema) {console.info(source_schema)}

    toTitleCase = (str: string) => OcdUtils.toTitleCase(str)
    toCamelCase = (str: string) => OcdUtils.toCamelCase(str)
}

export default OcdSchemaImporter
module.exports = { OcdSchemaImporter }
