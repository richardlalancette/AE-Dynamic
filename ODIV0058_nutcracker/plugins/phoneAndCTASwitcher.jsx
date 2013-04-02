﻿    var assets = {       projectPath: app.project.file.path,       activeComp: app.project.activeItem,       script: (new File($.fileName)).parent,       systemFolders: {           main: "x",            locationFolders: {               },            phoneFolder: "x"               }        };    var specs = {                phone: {number: 10, name: ["x"]},        location: {number: 10, name: ["x"]},        xml: {            directory: "/data/locations_02.xml",             phone: 10,             location: 10,            numbersChanged: false,            file: "x",            data: "x",            readable: "x",            },        name: {            prefix:"jobNo_roundXX",             date: {                all: "x",                 string: "x",                 year: "x",                 month: "x",                day: "x",                hour: "x",                min: "x"                }            },        validation: {            preliminary: {                 nameSet: false,                 xmlLoaded: false,                 xmlError: false,                 notifications: {                    done: "allDone.jpg",                     xmlError: "errorLoadingXML.jpg",                      resetNumbers: "numbersResetToMatchXML.jpg",                     xmlImport: "pleaseImportXML.jpg",                     xmlAndPrefix: "pleaseImportXMLAndSetExportPrefix.jpg",                     start: "pleaseInputData.jpg",                    match: "pleaseMatchNumberstoXML.jpg",                    prefix: "pleaseSetExportPrefix.jpg"                    }                }            },        progress: {            ui: {                frame: "x",                circle: "x",                icons: "x"                }            }        }; function inputScreen() {    // USER INTERFACE            var scriptControl = new Window ("palette", "O2 Christmas Script");            scriptControl.graphics.backgroundColor = scriptControl.graphics.newBrush (scriptControl.graphics.BrushType.SOLID_COLOR, [1,1,1]); // BACKGROUND COLOUR            scriptControl.margins = [20,20,20,20]; // BOX MARGINS                                    var imageFolder = assets.script + "/assets";            var header = scriptControl.add ("image", undefined, File (imageFolder + "header.jpg"));                                 var UI_Info = scriptControl.add("panel", undefined, "Details")                                     var UI_Notifications = UI_Info.add("group", undefined, "Layout")                        UI_Notifications.orientation = "row";                        UI_Notifications.margins = [20,20,20,10];                        var UI_NotificationsImage = UI_Notifications.add ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.start));                                                       var UI_Phones = UI_Info.add("group", undefined, "Layout")                     UI_Phones.orientation = "row";                     UI_Phones.margins = [20,20,20,10];                        var UI_PhonesNumber = UI_Phones.add ("statictext", [0,0,177,20], "Number of Phones");                        var UI_PhonesNumberInput = UI_Phones.add ("edittext", [0,0,177,20], 10);                                            UI_PhonesNumberInput.onChange = function() {                                specs.phone.number = UI_PhonesNumberInput.text;                                                                if (specs.validation.preliminary.xmlLoaded == true && specs.phone.number != specs.xml.phone ) {                                    UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.match));                                    } else {                                    UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.start));                                    };                                                        };                                         var UI_Locations = UI_Info.add("group", undefined, "Layout")                    UI_Locations.orientation = "row";                    UI_Locations.margins = [20,10,20,10];                       var UI_LocationsNumber = UI_Locations.add ("statictext", [0,0,177,20], "Number of Locations");                       var UI_LocationsNumberInput = UI_Locations.add ("edittext", [0,0,177,20], 10);                                              UI_LocationsNumberInput.onChange = function() {                                specs.location.number = UI_LocationsNumberInput.text;                                                                if (specs.validation.preliminary.xmlLoaded == true && specs.location.number  != specs.xml.location ) {                                    UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.match));                                    } else {                                    UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.start));                                    };                                                        };                    var UI_Prefix = UI_Info.add("group", undefined, "Layout")                     UI_Prefix.orientation = "row";                     UI_Prefix.margins = [20,10,20,10];                        var UI_PrefixName = UI_Prefix.add ("statictext", [0,0,177,20], "Export Prefix");                        var UI_PrefixNameInput = UI_Prefix.add ("edittext", [0,0,177,20], "jobNo_roundXX");                                            UI_PrefixNameInput.onChange = function() {                        specs.validation.preliminary.nameSet = true;                        };                                                            var UI_Directory = UI_Info.add("group", undefined, "Layout")                     UI_Directory.orientation = "row";                     UI_Directory.margins = [20,10,20,10];                        var UI_DirectoryName = UI_Directory.add ("statictext", [0,0,177,20], "XML Directory");                        var UI_DirectoryNameInput = UI_Directory.add ("edittext", [0,0,177,20], "/data/locations_02.xml");                    var UI_Import = UI_Info.add("group", undefined, "Layout")                        UI_Import.orientation = "row";                        UI_Import.margins = [20,10,20,20];                        var UI_DirectoryImport = UI_Import.add ("button", [0,0,367,20], "Import XML");                                          UI_DirectoryImport.onClick = function() {                                       specs.validation.preliminary.xmlLoaded = false;                          specs.xml.numbersChanged = false;                         try {                             specs.xml.file = File (assets.projectPath + UI_DirectoryNameInput.text);                                                         specs.xml.file.open('r');                                                                                specs.xml.data = specs.xml.file.read() ;                                specs.xml.readable = new XML (specs.xml.data);                                                                    // LOAD VARIABLES                                    specs.xml.location = specs.xml.readable.locations.value.length();                                    specs.xml.phone = specs.xml.readable.phone.name.length();                                                                                                            // VERIFICATION                                    if (specs.xml.location == 0 || specs.xml.phone == 0  ) {                                        UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.xmlError));                                        specs.validation.preliminary.xmlError = true;                                         specs.validation.preliminary.xmlLoaded = false;                                        }else{                                                                                       //PHONES                                            if (specs.xml.phone !== specs.phone.number) {                                                UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.resetNumbers));                                                specs.phone.number = specs.xml.phone;                                                UI_PhonesNumberInput.text = specs.xml.phone;                                                specs.xml.numbersChanged = true;                                            } else {                                                };                                                                                        specs.phone.name = new Array;                                            for (var i = (specs.phone.number - 1) ; i >= 0; i--) {                                                                                       specs.phone.name.push(specs.xml.readable.phone.name[i]);                                                }                                                                                       //LOCATION                                            if (specs.xml.location !== specs.location.number) {                                                UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.resetNumbers));                                                specs.location.number = specs.xml.location;                                                UI_LocationsNumberInput.text = specs.xml.location;                                                specs.xml.numbersChanged = true;                                            } else {                                                };                                                                                        specs.location.name = new Array;                                            for (var i = (specs.location.number  - 1) ; i >= 0; i--) {                                                                                       specs.location.name.push(specs.xml.readable.locations.value[i]);                                                }                                                                                        specs.validation.preliminary.xmlError = false;                                             specs.validation.preliminary.xmlLoaded = true;                                             if (specs.validation.preliminary.nameSet == true && specs.xml.numbersChanged == false){                                                UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.done));                                                }else if ((specs.validation.preliminary.nameSet == false && specs.xml.numbersChanged == false) || (specs.validation.preliminary.nameSet == false && specs.xml.numbersChanged == true)){                                                UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.prefix));                                                }else if (specs.validation.preliminary.nameSet == true && specs.xml.numbersChanged == true){                                                UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.resetNumbers));                                                                                                    };                                                                                    };                                                                                                         specs.xml.file.close();                         } catch (err){                            UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.xmlError));                            specs.validation.preliminary.xmlError = true;                             specs.validation.preliminary.xmlLoaded = false;                          }                                     };                                                           var scriptControlBuild = scriptControl.add("group");                 var scriptControlBuildButton = scriptControlBuild.add ("button", [0,0,440,20], "Render");                // EXIT                    scriptControlBuildButton.onClick = function () {                        if (specs.validation.preliminary.xmlError == true || specs.validation.preliminary.nameSet == false || specs.validation.preliminary.xmlLoaded == false) {                            if (specs.validation.preliminary.nameSet == false && specs.validation.preliminary.xmlLoaded == true && specs.validation.preliminary.xmlError == false) {                                UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.prefix));                            } else if (specs.validation.preliminary.xmlLoaded == false && specs.validation.preliminary.nameSet == true && specs.validation.preliminary.xmlError == false){                                UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.xmlImport));                            } else if (specs.validation.preliminary.nameSet == false && specs.validation.preliminary.xmlLoaded == false && specs.validation.preliminary.xmlError == false) {                                UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.xmlAndPrefix));                            } else {                                UI_NotificationsImage.image = ("image", undefined, File (imageFolder + "validation"+"/" + specs.validation.preliminary.notifications.xmlError));                            };                                            } else {                            scriptControl.close();                            primaryBuild ();                        };                };scriptControl.show ();   } // END INPUT SCREEN    function primaryBuild() {    // CREATE MAIN EXPORT FOLDER    specs.name.date.all = new Date(Date(0));    specs.name.date.year = (specs.name.date.all.getFullYear()).toString().slice(2,4);    if ((specs.name.date.all.getMonth()).toString().length == 1 && specs.name.date.all.getMonth() != 9) {        specs.name.date.month =  "0" +  ((specs.name.date.all.getMonth() + 1).toString());        }else if (specs.name.date.all.getMonth() == 9) {        specs.name.date.month = ((specs.name.date.all.getMonth() + 1).toString());        } else {        specs.name.date.month = (specs.name.date.all.getMonth()).toString();        };        if ((specs.name.date.all.getDate()).toString().length == 1) {        specs.name.date.day =  "0" +  ((specs.name.date.all.getDate() + 1).toString());        } else {        specs.name.date.day = (specs.name.date.all.getDate()).toString();        };        if ((specs.name.date.all.getHours()).toString().length == 1) {        specs.name.date.hour =  "0" +  ((specs.name.date.all.getHours()).toString());        } else {        specs.name.date.hour = (specs.name.date.all.getHours()).toString();        };        if ((specs.name.date.all.getMinutes()).toString().length == 1) {        specs.name.date.min =  "0" +  ((specs.name.date.all.getMinutes()).toString());        } else {        specs.name.date.min = (specs.name.date.all.getMinutes()).toString();        };            specs.name.date.all = specs.name.date.year + specs.name.date.month + specs.name.date.day + "-"+ specs.name.date.hour + specs.name.date.min;        assets.systemFolders.main = new Folder (assets.projectPath + "/exports_" + specs.name.date.all).create();        // CREATE LOCATION FOLDERS    for (var i = (specs.location.number  - 1) ; i >= 0; i--) {                                               assets.systemFolders.locationFolders[specs.location.name[i]] = new Folder (assets.projectPath + "/exports_" + specs.name.date.all + "/" +  specs.location.name[i]);        assets.systemFolders.locationFolders[specs.location.name[i]].create();        }        //CREATES _TEMP FOLDER    assets.systemFolders.phoneFolder = new Folder (assets.projectPath + "/exports_" + specs.name.date.all + "/" +  "_temp");    assets.systemFolders.phoneFolder.create();        } // END PRIMARY BUILD/*function primaryExport() {    var specs.progress.ui.frame = new Window ("dialog", "O2 Christmas Script");            specs.progress.ui.frame.graphics.backgroundColor = scriptControl.graphics.newBrush (scriptControl.graphics.BrushType.SOLID_COLOR, [1,1,1]); // BACKGROUND COLOUR            specs.progress.ui.frame.margins = [20,20,20,20]; // BOX MARGINS    }*/if (app.project.activeItem &&  app.project.activeItem) {    inputScreen();    } else {    alert("Please Save Project & Open Comp Before Running");};