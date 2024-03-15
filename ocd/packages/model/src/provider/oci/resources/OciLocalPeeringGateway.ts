/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdResources } from "../../../OcdDesign"
import * as AutoGenerated from "./generated/OciLocalPeeringGateway"

export interface OciLocalPeeringGateway extends AutoGenerated.OciLocalPeeringGateway {}

export namespace OciLocalPeeringGateway {
    
    export function newResource(type?: string): OciLocalPeeringGateway {
        return {
            ...AutoGenerated.OciLocalPeeringGateway.newResource('local_peering_gateway'),
        }
    }
    export function cloneResource(resource: OciLocalPeeringGateway, type?: string): OciLocalPeeringGateway {
        return AutoGenerated.OciLocalPeeringGateway.cloneResource(resource, 'local_peering_gateway') as OciLocalPeeringGateway
    }
    export function allowedParentTypes(): string[] {
        // console.debug('OciLocalPeeringGateway: Allowed Parent Types')
        return ['Vcn']
    }
    export function getParentId(resource: OciLocalPeeringGateway): string {
        // console.debug('OciLocalPeeringGateway: Getting Parent Id to for', resource.displayName, resource.id)
        return resource.vcnId
    }
    export function setParentId(resource: OciLocalPeeringGateway, parentId: string): OciLocalPeeringGateway {
        // console.debug('OciLocalPeeringGateway: Setting Parent Id to', parentId, 'for', resource.displayName, resource.id)
        resource.vcnId = parentId
        return resource
    }
    export function getConnectionIds(resource: OciLocalPeeringGateway, allResources: OcdResources): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        // console.debug('OciLocalPeeringGateway: Getting Connection Ids to for', resource.displayName, resource.id)
        let associationIds: string[] = (resource.routeTableId && resource.routeTableId !== '') ? [resource.routeTableId] : []
        if (resource.peerId && resource.peerId !== '') associationIds.push(resource.peerId)
        return associationIds
    }
    
}

export class OciLocalPeeringGatewayClient {
    static new(): OciLocalPeeringGateway {
        return OciLocalPeeringGateway.newResource()
    }
    static clone(resource: OciLocalPeeringGateway): OciLocalPeeringGateway {
        return OciLocalPeeringGateway.cloneResource(resource)
    }
}

export default OciLocalPeeringGatewayClient
