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

/*
// Model designed
transaction Design extends Trans {
}
// Plastic collection
transaction MaterialCollection extends Trans {
}
// Manufacturing
transaction Manufacture extends Trans {
}
// Sell a shoe (retail or re-sell)
transaction SellShoe extends Trans {
}
// Checkpoint event (clubs, store)
transaction CheckPoint extends Trans {
}
// Recycling
transaction Recycle extends Trans {
}
*/

/**
 * Design transaction.
 * @param {blockchain.adidas.sneaker.Design}
 * @transaction
 */
//function changeStatus(myTrans) {
//  console.log('Transaction: ' + myTrans);
//}






/**
 * Sample transaction processor function.
 * @param {blockchain.adidas.sneaker.SetupDemo} tx The sample transaction instance.
 * @transaction
 */
function setupDemo(setupDemo) {  // eslint-disable-line no-unused-vars
  var factory = getFactory();
  var NS = 'blockchain.adidas.sneaker';

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
}
