/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OciDrgRouteTableRouteRuleAutoGeneratedModel } from "./generated/OciDrgRouteTableRouteRuleModel"

export interface OciDrgRouteTableRouteRuleModel extends OciDrgRouteTableRouteRuleAutoGeneratedModel {
}

export namespace OciDrgRouteTableRouteRuleModel {
    export function newResource(type?: string): OciDrgRouteTableRouteRuleModel {
        return {
            ...OciDrgRouteTableRouteRuleAutoGeneratedModel.newResource('drg_route_table_route_rule'),
        }
    }
}

export class OciDrgRouteTableRouteRuleModelClient {
    static new(): OciDrgRouteTableRouteRuleModel {
        return OciDrgRouteTableRouteRuleModel.newResource()
    }
}

export default OciDrgRouteTableRouteRuleModelClient
