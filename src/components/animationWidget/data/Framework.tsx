
export interface IFramework  {
        initialized : boolean,
        automaticSwitchingOn : boolean,
        breakAnimation  : boolean,
    

        // Three JS part of the framework
        renderer : any,
        camera : any,
        scene : any,

        // If background is dark change logo to light version
        bgDark : boolean,
        sceneIndex : number;
        changeVisuals : boolean;
       
    }

export const framework : IFramework = {
        initialized : false,
        automaticSwitchingOn : true,
        breakAnimation  : false,

      
        // Three JS part of the framework
        renderer : null,
        camera : null,
        scene : null,

        // If background is dark change logo to light version
        bgDark : false,
        sceneIndex : 0,
        changeVisuals : false
}

   