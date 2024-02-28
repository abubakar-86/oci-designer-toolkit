/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

import { OcdResources } from "../../../OcdDesign"
import * as AutoGenerated from "./generated/OciNetworkSecurityGroupSecurityRule"

export interface OciNetworkSecurityGroupSecurityRule extends AutoGenerated.OciNetworkSecurityGroupSecurityRule {}

export interface OciIcmpOptions extends AutoGenerated.OciIcmpOptions {}

export interface OciTcpOptions extends AutoGenerated.OciTcpOptions {}

export interface OciDestinationPortRange extends AutoGenerated.OciDestinationPortRange {}

export interface OciSourcePortRange extends AutoGenerated.OciSourcePortRange {}

export interface OciUdpOptions extends AutoGenerated.OciUdpOptions {}

export namespace OciNetworkSecurityGroupSecurityRule {
    
    export interface OciIcmpOptions extends AutoGenerated.OciNetworkSecurityGroupSecurityRule.OciIcmpOptions {}

    export interface OciTcpOptions extends AutoGenerated.OciNetworkSecurityGroupSecurityRule.OciTcpOptions {}

    export interface OciDestinationPortRange extends AutoGenerated.OciNetworkSecurityGroupSecurityRule.OciDestinationPortRange {}

    export interface OciSourcePortRange extends AutoGenerated.OciNetworkSecurityGroupSecurityRule.OciSourcePortRange {}

    export interface OciUdpOptions extends AutoGenerated.OciNetworkSecurityGroupSecurityRule.OciUdpOptions {}

    export function newResource(type?: string): OciNetworkSecurityGroupSecurityRule {
        return {
            ...AutoGenerated.OciNetworkSecurityGroupSecurityRule.newResource('network_security_group_security_rule'),
        }
    }
    export function cloneResource(resource: OciNetworkSecurityGroupSecurityRule, type?: string): OciNetworkSecurityGroupSecurityRule {
        return AutoGenerated.OciNetworkSecurityGroupSecurityRule.cloneResource(resource, 'network_security_group_security_rule') as OciNetworkSecurityGroupSecurityRule
    }
    export function allowedParentTypes(): string[] {
        // console.debug('OciNetworkSecurityGroupSecurityRule: Allowed Parent Types')
        return ['NetworkSecurityGroup']
    }
    export function getParentId(resource: OciNetworkSecurityGroupSecurityRule): string {
        // console.debug('OciNetworkSecurityGroupSecurityRule: Getting Parent Id to for', resource.displayName, resource.id)
        const parentId = resource.networkSecurityGroupId !== '' ? resource.networkSecurityGroupId : resource.compartmentId
        return parentId
    }
    export function setParentId(resource: OciNetworkSecurityGroupSecurityRule, parentId: string): OciNetworkSecurityGroupSecurityRule {
        // console.debug('OciNetworkSecurityGroupSecurityRule: Setting Parent Id to', parentId, 'for', resource.displayName, resource.id)
        resource.networkSecurityGroupId = parentId
        return resource
    }
    export function getConnectionIds(resource: OciNetworkSecurityGroupSecurityRule, allResources: OcdResources): string[] {
        // This List of Ids does not include the Parent Id or Compartment Id
        // console.debug('OciNetworkSecurityGroupSecurityRule: Getting Connection Ids to for', resource.displayName, resource.id)
        return []
    }
    
    export function newOciIcmpOptions(): OciIcmpOptions {
        return {
            ...AutoGenerated.OciNetworkSecurityGroupSecurityRule.newOciIcmpOptions(),
        }
    }

    export function newOciTcpOptions(): OciTcpOptions {
        return {
            ...AutoGenerated.OciNetworkSecurityGroupSecurityRule.newOciTcpOptions(),
        }
    }

    export function newOciDestinationPortRange(): OciDestinationPortRange {
        return {
            ...AutoGenerated.OciNetworkSecurityGroupSecurityRule.newOciDestinationPortRange(),
        }
    }

    export function newOciSourcePortRange(): OciSourcePortRange {
        return {
            ...AutoGenerated.OciNetworkSecurityGroupSecurityRule.newOciSourcePortRange(),
        }
    }

    export function newOciUdpOptions(): OciUdpOptions {
        return {
            ...AutoGenerated.OciNetworkSecurityGroupSecurityRule.newOciUdpOptions(),
        }
    }

}

export class OciNetworkSecurityGroupSecurityRuleClient {
    static new(): OciNetworkSecurityGroupSecurityRule {
        return OciNetworkSecurityGroupSecurityRule.newResource()
    }
    static clone(resource: OciNetworkSecurityGroupSecurityRule): OciNetworkSecurityGroupSecurityRule {
        return OciNetworkSecurityGroupSecurityRule.cloneResource(resource)
    }
}

export default OciNetworkSecurityGroupSecurityRuleClient
