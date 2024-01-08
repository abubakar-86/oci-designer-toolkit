/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciDhcpOptions"
import { OciModelResources as Model } from '@ocd/model'

export class OciDhcpOptions extends AutoGenerated.OciDhcpOptions {
    /*
    ** Override Generate Terraform Resource / Data Statement(s) to check for Default
    */
    generate(resource: Model.OciDhcpOptions | undefined) {
        resource = resource ? resource : this.resource
        if (resource.locked) {
            return this.generateData(resource)
        } else if (resource.vcnDefault) {
            return this.generateDefaultResource(resource)
        } else {
            return this.generateResource(resource)
        }
    }

    generateDefaultResource(resource: Model.OciDhcpOptions ) {
        const content = `
# ------ Update Default Security List
resource "oci_core_default_dhcp_options" "${resource.terraformResourceName}" {
    ${this.manageDefaultResourceId(resource)}
    ${this.displayName(resource)}
    ${this.domainNameType(resource)}
    ${this.optionsObjectList(resource.options)}
}

locals {
    ${resource.terraformResourceName}_id = oci_core_default_dhcp_options.${resource.terraformResourceName}.id
    ${this.generateAdditionalResourceLocals(resource)}
}
`
    return content
    }
    // Simple Elements
    manageDefaultResourceId = (resource: Record<string, any>, level=0): string => {return `${this.indentation[level]}manage_default_resource_id = local.${this.idTFResourceMap[resource.vcnId]}_default_security_list_id`}
}

export default OciDhcpOptions
