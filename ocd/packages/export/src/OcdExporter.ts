/*
** Copyright (c) 2020, 2024, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdDesign } from "@ocd/model";
import { OcdUtils } from "@ocd/core";

export interface OutputDataString extends Record<string, string> {}
export interface OutputDataStringArray extends Record<string, string[]> {}

class OcdExporter {
    design: OcdDesign
    constructor() {
        this.design = OcdDesign.newDesign()
    }

    getOciResources() {return OcdDesign.getOciResources(this.design)}
    getAzureResources() {return OcdDesign.getAzureResources(this.design)}
    getGcpResources() {return OcdDesign.getGcpResources(this.design)}
    getResources() {return OcdDesign.getResources(this.design)}

    export = (design: OcdDesign): string | OutputDataStringArray | OutputDataString => ''

    toTitleCase = (str: string) => OcdUtils.toTitleCase(str)
    toCamelCase = (str: string) => OcdUtils.toCamelCase(str)
    toUnderscoreCase = (str: string) => OcdUtils.toUnderscoreCase(str)
}

export default OcdExporter
export { OcdExporter }
