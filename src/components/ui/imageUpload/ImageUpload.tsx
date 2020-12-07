import React from 'react';
import moment from "moment";
import { DefaultButton} from 'office-ui-fabric-react'

interface IImageUploadProps{
  onUpload : (fileObject : any) => void
  defaultValue? : any;
}

interface IImageUploadState{
  file : any;
  imagePreviewUrl :  any;
  fileUrl : any;

}

export class ImageUpload extends React.Component<IImageUploadProps, IImageUploadState>{
  constructor(props : IImageUploadProps) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: this.props.defaultValue && this.props.defaultValue.indexOf('_bkEnd') === -1? this.props.defaultValue : '', 
      fileUrl: ''
    };
  }

  public formatFilename(filename : any){
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `${cleanFileName}`;
    return newFilename.substring(0, 60);
  };



  public handleSubmit = (e : any) => {
    e.preventDefault();
    }
  
  public handleImageChange = (e : any) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    try{
        reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file)
      setTimeout(() => {
        this.onUpload()
      }, 500)
    }
    catch{
      console.log('error')
    }
  
    
  }

  public onUpload = () =>{
    if(this.state.file == ''){
      return 
    }
    var fileName = this.formatFilename(this.state.file.name);
    this.props.onUpload({'file' : this.state.file, 'name' : fileName, 'url' : this.state.imagePreviewUrl })
  }





public render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className="ArtWorkImg" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this.handleImageChange(e)} />
        </form>
        <div>
          {$imagePreview}
        </div>
      </div>
    )
  }
}