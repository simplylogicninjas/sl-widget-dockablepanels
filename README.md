# SL Dockablepanels

Dockable panels widget for Mendix

## 1. Description

You can use this widget to create panels that are dockable on different places in the screen. The widget can also be used as an alternative to tabcontainers. The panels can be dragged and dropped to different locations according to the preferences of the user. Panels can be closed and re-opened. The panel layout can be saved in an entity with a string attribute which allows users to customize their personal layout and keep it.

### 1.1 Browser Example


<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-dockablepanels/main/docs/images/dockablepanels_browser_example.png" width="600"/>

## 2. Usage

* Place the widget anywere on the page, if you want to save the layout you have to place the widget inside a datagrid with an entity that has a unlimited string attribute.
* Make sure the parent element has height specified
* Create dockable panels and fill them with the desired content. Content can consist out of static or dynamic content such as data views and listviews.
* Adjust panel behaviour to your likings

### 2.1 Modeler example

<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-dockablepanels/main/docs/images/dockablepanels_modeler_example.png" width="600"/>


### 2.2 Configuration example
<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-dockablepanels/main/docs/images/dockablepanels_general_tab.png" width="400"/>
<img src="https://raw.githubusercontent.com/simplylogicninjas/sl-widget-dockablepanels/main/docs/images/dockablepanels_translate_tab.png" width="400"/>

## 3. Use Cases

* This widget can be used as a highly configurable dashboard.
* This widget can be used as an alternative to tabcontainers from the modeler.

## 4. Customization

To customize the content-container you can edit the styling with css using the classname:

* .sl-dockablepanels-container