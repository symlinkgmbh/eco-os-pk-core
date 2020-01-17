/**
 * Copyright 2018-2020 Symlink GmbH
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */




const ECO_OS_PK_CORE_TYPES = {
  IDynamicClient: Symbol.for("IDynamicClient"),
  IEcoAuthClient: Symbol.for("IEcoAuthClient"),
  IEcoConfigClient: Symbol.for("IEcoConfigClient"),
  IEcoMailClient: Symbol.for("IEcoMailClient"),
  IEcoUserClient: Symbol.for("IEcoUserClient"),
  IBootstrapperConfig: Symbol.for("IBootstrapperConfig"),
  IBootstrapper: Symbol.for("IBootstrapper"),
  IEcoKeyClient: Symbol.for("IEcoKeyClient"),
  IEcoContentClient: Symbol.for("IEcoContentClient"),
  IEcoRegistryClient: Symbol.for("IEcoRegistryClient"),
  IEcoI18nClient: Symbol.for("IEcoI18nClient"),
  IEcoIpProtectionClient: Symbol.for("IEcoIpProtectionClient"),
  IEcoQueueClient: Symbol.for("IEcoQueueClient"),
  IEcoMetricsClient: Symbol.for("IEcoMetricsClient"),
  IEcoLicenseClient: Symbol.for("IEcoLicenseClient"),
  IEcoFederationClient: Symbol.for("IEcoFederationClient"),
  IEcoFederationKeyClient: Symbol.for("IEcoFederationKeyClient"),
};

export { ECO_OS_PK_CORE_TYPES };
