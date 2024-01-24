/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import * as AutoGenerated from "./generated/OciInstance"
import { OciModelResources as Model } from '@ocd/model'

export class OciInstance extends AutoGenerated.OciInstance {

    // Metadata / Cache - Dropdown Data Generation
    retrieveImageId = () => {
        const content = `
data "oci_core_images" "${this.terraformResourceName}Images" {
    ${this.compartmentId(this.resource)}
    ${this.generateTextAttribute('display_name', this.resource.sourceDetails?.sourceId, true)}
}

locals {
    ${this.terraformResourceName}_image_id = data.oci_core_images.${this.terraformResourceName}Images.images[0]["id"]
}
`
    return content
    }
}

export default OciInstance
