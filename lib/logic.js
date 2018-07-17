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
 * @param {org.acme.sample.CreateDesign} design
 * @transaction
 */
function createDesign(design) {
  design.sneaker.status = 'DESIGNED';
}

/**
 * Order transaction.
 * @param {org.acme.sample.OrderShoe} order
 * @transaction
 */
function orderShoe(order) {
  order.sneaker.status = 'ORDERED';
  order.sneaker.currentOwner = order.buyer;
}

/**
 * Plastic collection stage.
 * @param {org.acme.sample.MaterialCollection} material
 * @transaction
 */
function collectMaterial(material) {
  material.sneaker.status = 'PLASTIC_COLLECTED';
  material.sneaker.plasticLat = material.lat;
  material.sneaker.plasticLong = material.long;
}

/**
 * Manufacturing.
 * @param {org.acme.sample.Manufacture} manufacture
 * @transaction
 */
function manufactureShoe(manufacture) {
  manufacture.sneaker.status = 'MANUFACTURED';
}

/**
 * SendShoe.
 * @param {org.acme.sample.SendShoe} sellTx
 * @transaction
 */
function sendShoe(sellTx) {
  var sneaker = sellTx.sneaker;
  sneaker.currentOwner = sellTx.buyer;
  sneaker.status = 'SHIPPED';

  return getAssetRegistry(NS + '.Sneaker')
  	.then(function(assetReg) {
    	return assetReg.update(sneaker);
	})
}

/**
 * CheckPoint.
 * @param {org.acme.sample.LoginAtLocation} checkPoint
 * @transaction
 */
function loginEvent(checkPoint) {
  checkPoint.sneaker.status = 'AT_EVENT';
}

/**
 * CheckPoint.
 * @param {org.acme.sample.LogOutFromLocation} checkPoint
 * @transaction
 */
function loginEvent(checkPoint) {
  checkPoint.sneaker.status = 'NO_EVENT';
}

/**
 * CheckPoint.
 * @param {org.acme.sample.Recycle} recycle
 * @transaction
 */
function endShoeLife(recycle) {
  recycle.sneaker.status = 'RECYCLED';
  recycle.sneaker.currentOwner = 'None';
}







/**
 * Sample transaction processor function.
 * @param {org.acme.sample.SetupDemo} tx
 * @transaction
 */
function setupDemo(tx) {  // eslint-disable-line no-unused-vars
  var factory = getFactory();

  var design = factory.newConcept(NS, 'Design');
  design.designedDate = 1531813808;
  design.name = "lightBoost";
  design.designer = "LuiVuitton";

  var attributes = factory.newConcept(NS, 'ShoeAttributes');
  attributes.creationDate = 1531813808;
  attributes.color = 'Blue';
  attributes.gender = 'UNISEX';
  attributes.sizeUS = 9;
  attributes.design = design;

  var owner = factory.newRelationship(NS, 'Owner', 'Me');
  owner.lastname = 'Young';

  var sneaker = factory.newResource(NS, 'Sneaker', '34576');
  sneaker.currentOwner = owner;
  sneaker.status = 'DESIGNED';
  sneaker.attributes = attributes;
  sneaker.plasticLat = '21.469114';
  sneaker.plasticLong = '-78.656894';

  return getAssetRegistry(NS + '.Sneaker')
  	.then(function(assetReg) {
    	return assetReg.add(sneaker);
	})
}
