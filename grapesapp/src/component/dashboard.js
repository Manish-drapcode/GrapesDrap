import React, { Component } from 'react';
import axios from 'axios';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import './dashboard.css';

import 'bootstrap/dist/css/bootstrap.min.css';


class Dashboard extends Component {
  constructor(props) {
    super(props);
      this.editor=null;
    this.state={isMounted:false};

  }
  componentDidMount(event) {
   
      this.initGrapesJs();
    
    
  }
 
  initGrapesJs() {
    // Initialize GrapesJS in componentDidMount
    const projectID = 1;
const projectEndpoint = `http://localhost:3003/user/projects/${projectID}`;

const editor = grapesjs.init({
  container: '#gjs',
  fromElement: false,
  components: `<h1 align='center' > Drap Code!</h1>`,
plugins:['gjs-preset-webpage'],
  height: '100vh',
  width: 'auto',

  //this is block area scope
  blockManager: {
    appendTo: '#blocks',
    attributes:{ class: ""},
    
    blocks: [
      {
          id: "section",
          label: "<b>Section</b>",
          attributes: { class: "gjs-block-section" },
          content: [
            
            `<section>
                <h1>This is a simple title</h1>
                <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
              </section>`],
        },
        {
          id: "text",
          label: "Text",
          content: '<div data-gjs-type="text">Insert your text here</div>',
        },
        {
          id: "image",
          label: "Image",
          select: true,
          content: { type: "image" },
          activate: true,
        },
        {
          id: "button",
          label: "button",
          select: true,
          content: '<span><button type="button">click me</button><br></span>',
          activate: true,
        },
        {
          id: "heading",
          label: "heading",
          select: true,
          content: "<h2>HEADING</h2>",
          activate: true,
        },
    ]
  },
  layerManager: {
    appendTo: '.layers-container'
  },
  panels: {
    defaults: [
    {
        id: 'panel-switcher',
        el: '.panel__switcher',
        buttons: [{
            id: 'show-layers',
            active: false,
            label: 'Layers',
            command: 'show-layers',
            // Once activated disable the possibility to turn it off
            togglable: false,
          }, {
            id: 'show-style',
            active: true,
            label: 'Styles',
            command: 'show-styles',
            togglable: false,
        }],
      },{
        id: 'layers',
        el: '.panel__right',
        // Make the panel resizable
        resizable: {
          maxDim: 250,
          minDim: 200,
          tc: 0, // Top handler
          cl: 0, // Left handler
          cr: 1, // Right handler
          bc: 0, // Bottom handler
    
          keyWidth: 'flex-basis',
        },
      },]
  },
  storageManager: {
    type: 'remote',
    stepsBeforeSave: 1,
    options: {
      remote: {
        urlLoad: projectEndpoint,
        urlStore: projectEndpoint,
     
        fetchOptions: opts => (opts.method === 'POST' ?  { method: 'PATCH' } : {}),
      
        onStore: data => ({ id: projectID, data }),
        onLoad: result => result.data,
      }
    }
  },

  selectorManager: {
    appendTo: '.styles-container'
  },
  styleManager: {
    appendTo: '.styles-container',

    sectors: [{
        name: 'Dimension',
        open: false,
        // Use built-in properties
        buildProps: ['width', 'min-height', 'padding'],
        // Use `properties` to define/override single property
        properties: [
          {
            // Type of the input,
            // options: integer | radio | select | color | slider | file | composite | stack
            type: 'integer',
            name: 'The width', // Label for the property
            property: 'width heigth padding ', // CSS property (if buildProps contains it will be extended)
            units: ['px', '%'], // Units, available only for 'integer' types
            defaults: 'auto', // Default value
            min: 0, // Min value, available only for 'integer' types
          }
        ]
      },{
        name: 'Extra',
        open: false,
        buildProps: ['background-color', 'box-shadow', 'custom-prop'],
        properties: [
          {
            id: 'custom-prop',
            name: 'Custom Label',
            property: 'font-size',
            type: 'select',
            defaults: '32px',
            // List of options, available only for 'select' and 'radio'  types
            options: [
              { value: '12px', name: 'Tiny' },
              { value: '18px', name: 'Medium' },
              { value: '32px', name: 'Big' },
            ],
         }
        ]
      }]
  },


});



editor.Commands.add('show-layers', {
  getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
  getLayersEl(row) { return row.querySelector('.layers-container') },

  run(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = '';
  },
  stop(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = 'none';
  },
});
editor.Commands.add('show-styles', {
  getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
  getStyleEl(row) { return row.querySelector('.styles-container') },

  run(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = '';
  },
  stop(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = 'none';
  },
});

editor.BlockManager.add("marquee", {
  label: "Marquee", 
  category: "custom Text",

  content: {
    tagName: "text",
    draggable: true,
    attributes: { color: "blue" },
    components: [
      {
        tagName: "div",
        components:
          '<span> <marquee> this is marquee text </marquee><br> </span>',
      },
    ],
  },
  panel: {
    open: false, // Set this to false to make it collapsed by default
  },
});

//edit pannel 


editor.Panels.addPanel({
  id: 'panel-top',
  el: '.panel__top',
});
editor.Panels.addPanel({
  id: 'basic-actions',
  el: '.panel__basic-actions',
  buttons: [
    {
      id: 'visibility',
      active: true, // active by default
      className: 'btn-toggle-borders',
      label: '<u> <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-type-bold" viewBox="0 0 16 16"> <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/> </svg>  </u>',
      command: 'sw-visibility', // Built-in command
    }, {
      id: 'export',
      className: 'btn-open-export',
      label: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-alphabet-uppercase" viewBox="0 0 16 16">
      <path d="M1.226 10.88H0l2.056-6.26h1.42l2.047 6.26h-1.29l-.48-1.61H1.707l-.48 1.61ZM2.76 5.818h-.054l-.75 2.532H3.51zm3.217 5.062V4.62h2.56c1.09 0 1.808.582 1.808 1.54 0 .762-.444 1.22-1.05 1.372v.055c.736.074 1.365.587 1.365 1.528 0 1.119-.89 1.766-2.133 1.766zM7.18 5.55v1.675h.8c.812 0 1.171-.308 1.171-.853 0-.51-.328-.822-.898-.822zm0 2.537V9.95h.903c.951 0 1.342-.312 1.342-.909 0-.591-.382-.954-1.095-.954zm5.089-.711v.775c0 1.156.49 1.803 1.347 1.803.705 0 1.163-.454 1.212-1.096H16v.12C15.942 10.173 14.95 11 13.607 11c-1.648 0-2.573-1.073-2.573-2.849v-.78c0-1.775.934-2.871 2.573-2.871 1.347 0 2.34.849 2.393 2.087v.115h-1.172c-.05-.665-.516-1.156-1.212-1.156-.849 0-1.347.67-1.347 1.83"/>
    </svg>`,
      command: 'export-template',
      context: 'export-template', // For grouping context of buttons from the same panel
    }, {
      id: 'show-json',
      className: 'btn-show-json',
      label: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-filetype-js" viewBox="0 0 16 16" > <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2H8v-1h4a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.186 15.29a1.2 1.2 0 0 1-.111-.449h.765a.58.58 0 0 0 .255.384q.105.073.249.114.143.041.319.041.246 0 .413-.07a.56.56 0 0 0 .255-.193.5.5 0 0 0 .085-.29.39.39 0 0 0-.153-.326q-.151-.12-.462-.193l-.619-.143a1.7 1.7 0 0 1-.539-.214 1 1 0 0 1-.351-.367 1.1 1.1 0 0 1-.123-.524q0-.366.19-.639.19-.272.528-.422.336-.15.776-.149.457 0 .78.152.324.153.5.41.18.255.2.566h-.75a.56.56 0 0 0-.12-.258.6.6 0 0 0-.247-.181.9.9 0 0 0-.369-.068q-.325 0-.513.152a.47.47 0 0 0-.184.384q0 .18.143.3a1 1 0 0 0 .405.175l.62.143q.327.075.566.211.24.136.375.358t.135.56q0 .37-.188.656a1.2 1.2 0 0 1-.539.439q-.351.158-.858.158-.381 0-.665-.09a1.4 1.4 0 0 1-.478-.252 1.1 1.1 0 0 1-.29-.375m-3.104-.033A1.3 1.3 0 0 1 0 14.791h.765a.6.6 0 0 0 .073.27.5.5 0 0 0 .454.246q.285 0 .422-.164.138-.165.138-.466v-2.745h.79v2.725q0 .66-.357 1.005-.354.345-.984.345a1.6 1.6 0 0 1-.569-.094 1.15 1.15 0 0 1-.407-.266 1.1 1.1 0 0 1-.243-.39"/></svg>',
      context: 'show-json',
      command(editor) {
        editor.Modal.setTitle('Components JSON')
          .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
          .open();
      },
    }
  ],
});


editor.on('run:export-template:before', opts => {
  console.log('Before the command run');
  if (0 /* some condition */) {
    opts.abort = 1;
  }
});
editor.on('run:export-template', () => console.log('After the command run'));
editor.on('abort:export-template', () => console.log('Command aborted'));
      

  }

  render() {
    return (<>
       <div className="container-fluid">

    <div className="row">
      <div className="panel__top">
        <div className="row">
          <div className="col-md-2"> <div className="panel__switcher"> </div></div>
          <div className="col-md-10"><div className="panel__basic-actions"></div> </div>
        </div>             
    </div>
    </div>

{/* <!-- 2nd row  --> */}
    <div className="row gx-0">
      <div className="col-md-2 ">
        {/* <button className="btn " type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="True" aria-controls="collapseExample">
          blocks 
        </button> */}
        {/* <div  className ="collapse" id="collapseExample"> */}
          <div   className ="card card-body" id="blocks"> </div>
        {/* </div> */}
        
      </div>
      <div className="col-md-10 " >
      <div className="editor-row">
        <div className="col-md-9">
          <div id="gjs"></div>
      </div>
      <div className='col-md-3'>
      <div className="panel__right">
        <div className="layers-container" id="layersPannel"></div>
        <div className="styles-container" id="StylesPannel"></div>
        {/* <!-- <div class="traits-container"></div> --> */}
      </div>
      </div>
        
      </div>

      </div>
      
    </div>
  </div>
    </>
    )
  }

}

export default Dashboard;