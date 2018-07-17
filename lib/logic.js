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
 * Plastic collection stage.
 * @param {org.acme.sample.MaterialCollection} material
 * @transaction
 */
function collectMaterial(material) {
  material.sneaker.status = 'PLASTIC_COLLECTED';
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
 * SellShoe.
 * @param {org.acme.sample.SellShoe} sellTx
 * @transaction
 */
function shellShoe(sellTx) {
  var sneaker = sellTx.sneaker;
  var buyer = sellTx.buyer;

  sneaker.currentOwner = buyer;
  sneaker.status = 'SOLD';

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

  console.log('Hello from setupDemo');
  console.log(tx.text);
  /*
  var factory = getFactory();
  var NS = 'org.acme.sample';

  // create the owner
  var currentOwner = factory.newResource(NS, 'Owner', 'Sni Ker');

  // create all the shoe attributes
  var shoeAttributes = factory.newConcept(NS, 'ShoeAttributes');
  shoeAttributes.creationDate = setupDemo.timestamp;
  shoeAttributes.color = 'Blue';
  shoeAttributes.model = 'ultraBoost';
  shoeAttributes.forWhom = 'MALE';
  shoeAttributes.sizeUS = '9';

  // create a sneaker
  var sneaker = factory.newResource(NS, 'Sneaker', '320022000251363131363432');
  sneaker.attributes = shoeAttributes;
  sneaker.currentOwner = currentOwner;
  var pOwners = ['Kayne West', 'Michael Jackson', 'Taylor Swift'];
  for (var i = 0; i < pOwners.length; i++) {
    var prevOwner = factory.newResource(NS, 'Owner', pOwners[i]);
    sneaker.ownerHistory.push(prevOwner);
  }

  return getParticipantsRegistry(NS, + '.Owner')
  	.then(function (ownerRegistry) {
    	// add the owner
    	return ownerRegistry.addAll([owner]);
  	})
  	.then(function () {
    	return getAssetRegistry(NS + '.Sneaker');
  	})
  	.then(function (sneakerRegistry) {
    	// add the sneaker
    	return sneakerRegistry.addAll([sneaker]);
	})
    */

  return 0;
}
