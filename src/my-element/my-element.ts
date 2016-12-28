class MyElement extends polymer.Base {
  
  is:string = 'my-element';
  
  properties;
  
  prop1: string;
  
  beforeRegister() {
      
      this.properties = {
        /**
         * My comment.
         *
         * @type { String }
         */
        prop1: {
          type: String,
          value: 'my-element'
        }
      };
    }  
}

Polymer(MyElement);
