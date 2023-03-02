/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OciVcnAutoGenerated } from "./generated/OciVcn"

export interface OciVcn extends OciVcnAutoGenerated {
}

export namespace OciVcn {
    export function newResource(type?: string): OciVcn {
        return {
            ...OciVcnAutoGenerated.newResource('vcn'),
        }
    }
}

export class OciVcnClient {
    static new(): OciVcn {
        return OciVcn.newResource()
    }
}

export default OciVcnClient
