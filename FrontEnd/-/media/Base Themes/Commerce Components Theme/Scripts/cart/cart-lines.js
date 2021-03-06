// -----------------------------------------------------------------------
// Copyright 2016 Sitecore Corporation A/S
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
// except in compliance with the License. You may obtain a copy of the License at
//       http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under the
// License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the specific language governing permissions
// and limitations under the License.
// -------------------------------------------------------------------------------------------

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // use AMD define funtion to support AMD modules if in use
    define("CXA/Feature/CartLines", ["exports"], factory);
  } else if (typeof exports === "object") {
    // to support CommonJS
    factory(exports);
  }
  // browser global variable
  root.CartLines = factory;
}(this, function (element) {
  "use strict";

  var component = new Component(element);
  component.Name = "CXA/Feature/CartLines";
  component.InExperienceEditorMode = function () {
    function getMiniProductMockImage() {
      var imageSrc = "";
      var pageExtension = getCurrentPageExtension();
      var tenantAndSiteNames = getCurrentTenantAndSiteName();
      if (pageExtension === "html") {
        imageSrc =
                    "-/media/Project/" + tenantAndSiteNames.Tenant + "/" + tenantAndSiteNames.Site + "/Placeholder Images/72x72.png";
      } else {
        imageSrc =
                    "/sitecore/shell/-/media/Feature/Experience%20Accelerator/Commerce/Catalog/72x72.png?h=72&w=72";
      }
      return imageSrc;
    }

    var productImage = getMiniProductMockImage();
    component.Visual.Disable();
    component.Model = new CartLinesViewModel({});
    ko.applyBindings(component.Model, component.RootElement);

    for (var i = 0; i < 5; i++) {

      if (i === 4) {
        component.Model.cart().cartLines.push({
          displayName: "Lorem ipsum dolor sit amet, id dicant",
          productUrl: "javascript:vid(0)",
          discountOfferNames: ["mediocritatem no mei(25%)"],
          quantity: "1",
          linePrice: "0.00 USD",
          lineTotal: "0.00 USD",
          lineItemDiscount: "0.00 USD",
          externalCartLineId: i,
          image: productImage,
          shippingMethodName: "Etiam rhoncus",
          address: {
            Address1: "Mauris eget lacus sed dolor viverra",
            City: "Etiam",
            State: "In gravida",
            ZipPostalCode: "99999",
            Country: "Nam pulvinar"
          },
          properties: [{ label: "Lorem:", value: "ipsum" }],
          sublines: [
            {
              displayName: "Lorem ipsum dolor sit amet, id dicant",
              productUrl: "javascript:vid(0)",
              discountOfferNames: ["mediocritatem no mei(25%)"],
              quantity: "1",
              linePrice: "0.00 USD",
              lineTotal: "0.00 USD",
              lineItemDiscount: "0.00 USD",
              externalCartLineId: i,
              properties: [{ label: "Lorem:", value: "ipsum" }],
              image: productImage
            },
            {
              displayName: "Lorem ipsum dolor sit amet, id dicant",
              productUrl: "javascript:vid(0)",
              discountOfferNames: ["mediocritatem no mei(25%)"],
              quantity: "1",
              linePrice: "0.00 USD",
              lineTotal: "0.00 USD",
              lineItemDiscount: "0.00 USD",
              externalCartLineId: i,
              properties: [{ label: "Lorem:", value: "ipsum" }],
              image: productImage
            }
          ]
        });
        break;
      }
      component.Model.cart().cartLines.push({
        displayName: "Lorem ipsum dolor sit amet, id dicant",
        productUrl: "javascript:vid(0)",
        discountOfferNames: ["mediocritatem no mei(25%)"],
        quantity: "1",
        linePrice: "0.00 USD",
        lineTotal: "0.00 USD",
        lineItemDiscount: "0.00 USD",
        externalCartLineId: i,
        image: productImage,
        shippingMethodName: "Etiam rhoncus",
        address: {
          Address1: "Mauris eget lacus sed dolor viverra",
          City: "Etiam",
          State: "In gravida",
          ZipPostalCode: "99999",
          Country: "Nam pulvinar"
        },
        properties: [{ label: "Lorem:", value: "ipsum" }],
        sublines: []
      });
    }
  };

  component.OnCartUpdated = function (data) {
    $(component.RootElement).find(".glyphicon")
      .removeClass("glyphicon-refresh");
    $(component.RootElement).find(".glyphicon")
      .removeClass("glyphicon-refresh-animate");

    $(component.RootElement).find(".glyphicon")
      .removeClass("glyphicon-remove-circle");
    $(component.RootElement).find(".glyphicon")
      .addClass("glyphicon-remove-circle");

    AjaxService.Post("/api/cxa/Cart/GetCart", {}, function (data, success, sender) {
      if (success && data && data.Success) {
        component.model.updateModel(data);
      }
    });
  };

  component.StartListening = function () {
    CartContext.SubscribeHandler(CartContext.CartEvents.CartUpdate, component.OnCartUpdated);
  };

  component.Init = function () {
    if (CXAApplication.RunningMode === RunningModes.Normal) {
      component.StartListening();
      AjaxService.Post("/api/cxa/Cart/GetCart", {}, function (data, success, sender) {
        if (success && data && data.Success) {
          component.model = new CartLinesViewModel(data);
          ko.applyBindings(component.model, component.RootElement);
        }
      });
    }
  };

  return component;
}));