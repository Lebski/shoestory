/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

// For use with the Registry
var NS = 'org.acme.sample';

/**
 * Design transaction.
 * @param {org.acme.sample.CreateDesign} tx
 * @transaction
 */
function createDesign(tx) {
  tx.sneaker.lifecycle.status = 'DESIGNED';
  tx.sneaker.lifecycle.timestamp = tx.timestamp;

  return getAssetRegistry(NS +'.Sneaker')
    .then(function(assetReg) {
    	return assetReg.update(tx.sneaker);
  	})
}

/**
 * Plastic collection stage.
 * @param {org.acme.sample.MaterialCollection} tx
 * @transaction
 */
function collectMaterial(tx) {
  tx.sneaker.lifecycle.status = 'PLASTIC_COLLECTED';
  tx.sneaker.lifecycle.lat = tx.lat;
  tx.sneaker.lifecycle.long = tx.long;
  tx.sneaker.lifecycle.timestamp = tx.timestamp;

  return getAssetRegistry(NS +'.Sneaker')
    .then(function(assetReg) {
    	return assetReg.update(tx.sneaker);
  	})
}

/**
 * Manufacturing.
 * @param {org.acme.sample.Manufacture} tx
 * @transaction
 */
function manufactureShoe(tx) {
  tx.sneaker.lifecycle.status = 'MANUFACTURED';
  tx.sneaker.lifecycle.timestamp = tx.timestamp;

  return getAssetRegistry(NS +'.Sneaker')
    .then(function(assetReg) {
    	return assetReg.update(tx.sneaker);
  	})
}

/**
 * SendShoe.
 * @param {org.acme.sample.SendShoe} tx
 * @transaction
 */
function sendShoe(tx) {
  tx.sneaker.lifecycle.status = 'AT_WAREHOUSE';
  tx.sneaker.lifecycle.lat = tx.lat;
  tx.sneaker.lifecycle.long = tx.long;
  tx.sneaker.lifecycle.timestamp = tx.timestamp;

  return getAssetRegistry(NS + '.Sneaker')
  	.then(function(assetReg) {
    	return assetReg.update(tx.sneaker);
	})
}

/**
 * Store sale.
 * @param {org.acme.sample.StoreSale} tx
 * @transaction
 */
function storeSale(tx) {
  tx.sneaker.lifecycle.lat = tx.lat;
  tx.sneaker.lifecycle.long = tx.long;
  tx.sneaker.lifecycle.timestamp = tx.timestamp;

  return getAssetRegistry(NS +'.Sneaker')
    .then(function(assetReg) {
    	return assetReg.update(tx.sneaker);
  	})
}

/**
 * CheckPoint.
 * @param {org.acme.sample.LoginAtLocation} tx
 * @transaction
 */
function loginAtLocation(tx) {
  tx.sneaker.lifecycle.status = 'AT_EVENT';
  tx.sneaker.lifecycle.lat = tx.lat;
  tx.sneaker.lifecycle.long = tx.long;
  tx.sneaker.lifecycle.timestamp = tx.timestamp;

  return getAssetRegistry(NS +'.Sneaker')
    .then(function(assetReg) {
    	return assetReg.update(tx.sneaker);
  	})
}

/**
 * CheckPoint.
 * @param {org.acme.sample.LogOutFromLocation} tx
 * @transaction
 */
function logoutFromLocation(tx) {
  tx.sneaker.lifecycle.status = 'NO_EVENT';
  tx.sneaker.lifecycle.lat = tx.lat;
  tx.sneaker.lifecycle.long = tx.long;
  tx.sneaker.lifecycle.timestamp = tx.timestamp;

  return getAssetRegistry(NS +'.Sneaker')
    .then(function(assetReg) {
    	return assetReg.update(tx.sneaker);
  	})
}

/**
 * Donation.
 * @param {org.acme.sample.Donate} tx
 * @transaction
 */
function donate(tx) {
  tx.sneaker.lifecycle.status = 'DONATED';
  tx.sneaker.currentOwner = 'None';
  tx.sneaker.lifecycle.lat = tx.lat;
  tx.sneaker.lifecycle.long = tx.long;
  tx.sneaker.lifecycle.timestamp = tx.timestamp;

  return getAssetRegistry(NS +'.Sneaker')
    .then(function(assetReg) {
    	return assetReg.update(tx.sneaker);
  	})
}

/**
 * Recycling.
 * @param {org.acme.sample.Recycle} tx
 * @transaction
 */
function recycle(tx) {
  tx.sneaker.lifecycle.status = 'RECYCLED';
  tx.sneaker.currentOwner = 'None';

  return getAssetRegistry(NS +'.Sneaker')
    .then(function(assetReg) {
    	return assetReg.update(tx.sneaker);
  	})
}




/**
 * Sample transaction processor function.
 * @param {org.acme.sample.SetupDemo} tx
 * @transaction
 */
function setupDemo(tx) {  // eslint-disable-line no-unused-vars
  var factory = getFactory();

  var design = factory.newConcept(NS, 'Design');
  design.designedDate = tx.timestamp;
  design.name = "lightBoost";
  design.designer = "LuiVuitton";

  var attributes = factory.newConcept(NS, 'ShoeAttributes');
  attributes.design = design;
  attributes.color = 'Blue';
  attributes.gender = 'UNISEX';
  attributes.sizeUS = 9;

  var lifecycle = factory.newConcept(NS, 'Lifecycle');
  lifecycle.status = 'DESIGNED';
  lifecycle.timestamp = tx.timestamp;
  lifecycle.lat = '21.469114';
  lifecycle.long = '-78.656894';

  var owner = factory.newRelationship(NS, 'Owner', 'Kayne West');
  var sneaker = factory.newResource(NS, 'Sneaker', '1290');
  sneaker.attributes = attributes;
  sneaker.currentOwner = owner;
  sneaker.lifecycle = lifecycle;

  return getAssetRegistry(NS + '.Sneaker')
  	.then(function(assetReg) {
    	return assetReg.add(sneaker);
	})
}
