# SL Dockable panels

Dockable panels widget for Mendix

## 1\. Description

You can use this widget to create panels that are dockable on different places in the screen. The widget can also be used as an alternative to tabcontainers. The panels can be dragged and dropped to different locations according to the preferences of the user. Panels can be closed and re-opened and will be cached (retaining their content). The panel layout can be saved in an entity with a string attribute which allows users to customize their personal layout and save it.

### 1.1 Browser Examples

<table><tbody><tr><td>Dashboard Example</td><td>Dragging a panel</td><td>Restore hidden tabs</td></tr><tr><td><img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-dockablepanels/main/docs/images/dockables_browser_example.png" width="300"></td><td><img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-dockablepanels/main/docs/images/dockables_drag_panel.png" width="300"></td><td><img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-dockablepanels/main/docs/images/dockables_hidden_tabs.png" width="300"></td></tr></tbody></table>

## 2\. Usage

* Place the widget anywhere on the page, if you want to save the layout you have to place the widget inside a dataview with an entity that has a unlimited string attribute.
* Make sure the parent element has height specified.
* Create dockable panels and fill them with the desired content. Content can consist out of static or dynamic content such as data views and listviews.
* Adjust panel behavior to your likings

### 2.1 Features

* Panels can float above other panels.
* Panels can be dragged and dropped.
* Panels can be hidden and made visible again inside another panel.
* Panel-state is cached (Panels will retain content on dragging)
* Layout can be saved.

### 2.2 Modeler example

<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-dockablepanels/main/docs/images/dockablepanels_modeler_example.png" width="600">

### 2.3 Configuration example

<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-dockablepanels/main/docs/images/dockablepanels_general_tab.png" width="600"> <img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-dockablepanels/main/docs/images/dockablepanels_translate_tab.png" width="600">

## 3\. Use Cases

* This widget can be used as a highly configurable dashboard.
* This widget can be used as an alternative to tabcontainers from the modeler.

## 4\. Customization

To customize the content-container you can edit the styling with css using the classname:

* .sl-dockablepanels-container