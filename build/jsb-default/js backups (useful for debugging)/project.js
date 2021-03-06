require = function o(e, i, t) {
function n(c, a) {
if (!i[c]) {
if (!e[c]) {
var r = "function" == typeof require && require;
if (!a && r) return r(c, !0);
if (s) return s(c, !0);
var l = new Error("Cannot find module '" + c + "'");
throw l.code = "MODULE_NOT_FOUND", l;
}
var d = i[c] = {
exports: {}
};
e[c][0].call(d.exports, function(o) {
var i = e[c][1][o];
return n(i || o);
}, d, d.exports, o, e, i, t);
}
return i[c].exports;
}
for (var s = "function" == typeof require && require, c = 0; c < t.length; c++) n(t[c]);
return n;
}({
HelloWorld: [ function(o, e, i) {
"use strict";
cc._RF.push(e, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld");
cc.Class({
extends: cc.Component,
properties: {
label: {
default: null,
type: cc.Label
},
text: "Hello, World!",
fbLoginText: {
default: null,
type: cc.Label
}
},
showLog: function(o) {
this.label.string = o;
},
onLoad: function() {
this.showLog(this.text);
cc.sys.isMobile && this.testSdkbox();
},
update: function(o) {},
testSdkbox: function() {
this.testFB();
this.testAdMob();
this.testUnityAds();
this.testReview();
this.testShare();
this.testGoogleAnalytics();
},
testFB: function() {
var o = this;
sdkbox.PluginFacebook.init();
sdkbox.PluginFacebook.setListener({
onLogin: function(e, i) {
e ? o.showLog("login successful") : o.showLog("login failed");
},
onSharedSuccess: function(e) {
o.showLog(e);
o.fbLoginText.string = "logout";
},
onSharedFailed: function(e) {
o.showLog(msg);
o.fbLoginText.string = "login";
},
onGetUserInfo: function(e) {
o.showLog("onGetUserInfo");
console.log("Facebook > ", e.first_name);
console.log("Facebook > ", e.id);
console.log("Facebook > ", e.installed);
console.log("Facebook > ", e.is_silhouette);
console.log("Facebook > ", e.last_name);
console.log("Facebook > ", e.name);
console.log("Facebook > ", e.picture);
console.log("Facebook > ", e.picture_url);
console.log("Facebook > ", e.score);
},
onAPI: function(e, i) {
o.showLog(e + i);
},
onFetchFriends: function(e, i) {
o.showLog("onFetchFriends" + i);
},
onPermission: function(e, i) {
o.showLog("onPermission" + i);
}
});
sdkbox.PluginFacebook.isLoggedIn() ? this.fbLoginText.string = "logout" : this.fbLoginText.string = "login";
},
clickFBLogin: function() {
console.log("Facebook > clickFBLogin");
sdkbox.PluginFacebook.isLoggedIn() ? this.PluginFacebook.logout() : sdkbox.PluginFacebook.login();
},
clickFBLogout: function() {
console.log("Facebook > clickFBLogout");
sdkbox.PluginFacebook.logout();
},
clickFBShareLink: function() {
console.log("Facebook > clickFBShareLink");
var o = new Object();
o.type = "link";
o.link = "http://www.cocos2d-x.org";
o.title = "cocos2d-x";
o.text = "Best Mobile Game Engine";
o.image = "http://cocos2d-x.org/images/logo.png";
sdkbox.PluginFacebook.share(o);
},
clickFBDialogLink: function() {
console.log("Facebook > clickFBDialogLink");
var o = new Object();
o.type = "link";
o.link = "http://www.cocos2d-x.org";
o.title = "cocos2d-x";
o.text = "Best Mobile Game Engine";
o.image = "http://cocos2d-x.org/images/logo.png";
sdkbox.PluginFacebook.dialog(o);
},
clickFBInviteFriends: function() {
sdkbox.PluginFacebook.inviteFriends("https://fb.me/322164761287181", "http://www.cocos2d-x.org/attachments/801/cocos2dx_portrait.png");
},
clickFBGraphAPI: function() {
var o = new Object();
sdkbox.PluginFacebook.api("/me/friendlists", "GET", o, "/me/friendlists");
},
testAdMob: function() {
var o = this;
o.gameover = !1;
o.next_level = !1;
o.rewarded = !1;
sdkbox.PluginAdMob.init();
sdkbox.PluginAdMob.setListener({
adViewDidReceiveAd: function(e) {
o.showLog("AdMob adViewDidReceiveAd " + e);
if ("gameover" == e) {
if (o.gameover) return;
o.gameover = !0;
} else if ("next_level" == e) {
if (o.next_level) return;
o.next_level = !0;
} else if ("rewarded" == e) {
if (o.rewarded) return;
o.rewarded = !0;
}
sdkbox.PluginAdMob.show(e);
},
adViewDidFailToReceiveAdWithError: function(e, i) {
o.showLog("AdMob adViewDidFailToReceiveAdWithError " + e);
},
adViewWillPresentScreen: function(e) {
o.showLog("AdMob adViewWillPresentScreen " + e);
},
adViewDidDismissScreen: function(e) {
o.showLog("AdMob adViewDidDismissScreen " + e);
},
adViewWillDismissScreen: function(e) {
o.showLog("AdMob adViewWillDismissScreen " + e);
},
adViewWillLeaveApplication: function(e) {
o.showLog("AdMob adViewWillLeaveApplication " + e);
}
});
},
clickShowAdMobBanner: function() {
sdkbox.PluginAdMob.show("home");
},
clickShowAdMobInterstital: function() {
sdkbox.PluginAdMob.show("gameover");
},
clickShowAdMobVideo: function() {
sdkbox.PluginAdMob.show("rewarded");
},
clickHideAdMobBanner: function() {
sdkbox.PluginAdMob.hide("home");
},
clickHideAdMobInterstital: function() {
sdkbox.PluginAdMob.hide("gameover");
},
clickHideAdMobVideo: function() {
sdkbox.PluginAdMob.hide("rewarded");
},
testUnityAds: function() {
var o = this, e = sdkbox.PluginUnityAds;
e.setListener({
unityAdsDidClick: function(e) {
o.showLog("unityAdsDidClick " + e);
},
unityAdsPlacementStateChanged: function(e, i, t) {
o.showLog("unityAdsPlacementStateChanged:" + e + " oldState:" + i + " newState:" + t);
},
unityAdsReady: function(e) {
o.showLog("unityAdsReady " + e);
},
unityAdsDidError: function(e, i) {
o.showLog("unityAdsDidError:" + e + " message:" + i);
},
unityAdsDidStart: function(e) {
o.showLog("unityAdsDidStart=" + e);
},
unityAdsDidFinish: function(e, i) {
o.showLog("unityAdsDidFinish " + e + " state:" + i);
}
});
e.init();
},
clickShowUnityAds: function() {
var o = this;
sdkbox.PluginUnityAds.isReady("") ? sdkbox.PluginUnityAds.show("") : o.showLog("unityads is not ready");
},
testReview: function() {
var o = this, e = sdkbox.PluginReview;
e.setListener({
onDisplayAlert: function(e) {
o.showLog("Review: didDisplayAlert");
},
onDeclineToRate: function(e) {
o.showLog("Review: didDeclineToRate");
},
onRate: function(e) {
o.showLog("Review: didToRate");
},
onRemindLater: function(e) {
o.showLog("Review: didToRemindLater");
}
});
e.init();
},
clickReview: function() {
sdkbox.PluginReview.show(!0);
},
testShare: function() {
var o = this, e = sdkbox.PluginShare;
e.setListener({
onShareState: function(e) {
o.showLog("PluginShare onSharestate:" + e.state + " error:" + e.error);
e.state == sdkbox.SocialShareState.SocialShareStateSuccess && o.showLog("post success");
}
});
e.init();
},
clickShare: function() {
var o = {};
o.text = "#sdkbox(www.sdkbox.com) - the cure for sdk fatigue - from js - ";
o.title = "sdkbox";
o.link = "http://www.sdkbox.com";
o.showDialog = !1;
o.platform = sdkbox.SocialPlatform.Platform_Select;
sdkbox.PluginShare.share(o);
},
clickNativeShare: function() {
var o = {};
o.text = "#sdkbox(www.sdkbox.com) - the cure for sdk fatigue ";
o.title = "sdkbox";
o.link = "http://www.sdkbox.com";
sdkbox.PluginShare.nativeShare(o);
},
testGoogleAnalytics: function() {
sdkbox.PluginGoogleAnalytics.init();
var o = {
action: "purchase",
transaction: "T12345",
affiliation: "Google Store - Online",
transactionCouponCode: "SUMMER2017",
revenue: "37.39",
tax: "2.85",
shipping: "5.34",
productID: "P12345",
productName: "Android Warhol T-Shirt",
category: "Apparel/T-Shirts",
brand: "SDKBox",
productVariant: "black",
productCouponCode: "APPARELSALE",
price: "29.20",
quantity: "1",
currencyCode: "EUR"
};
sdkbox.PluginGoogleAnalytics.logECommerce(o);
var e = {
action: "refund",
transaction: "T12345"
};
sdkbox.PluginGoogleAnalytics.logECommerce(e);
var i = {
action: "refund",
transaction: "T12345",
productID: "P12345",
quantity: "1"
};
sdkbox.PluginGoogleAnalytics.logECommerce(i);
},
testFirebase: function() {
sdkbox.firebase.Analytics.init();
var o = {};
o[sdkbox.firebase.Analytics.Param.kFIRParameterItemID] = "id123456";
o[sdkbox.firebase.Analytics.Param.kFIRParameterItemName] = "name123456";
o[sdkbox.firebase.Analytics.Param.kFIRParameterItemCategory] = "category123456";
o[sdkbox.firebase.Analytics.Param.kFIRParameterPrice] = "123.4";
sdkbox.firebase.Analytics.logEvent(sdkbox.firebase.Analytics.Event.kFIREventViewItem, o);
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "HelloWorld" ]);