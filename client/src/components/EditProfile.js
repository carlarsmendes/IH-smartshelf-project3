import React from "react";
import {
  Button,
  Input,
  Label,
  FormFeedback,
  CustomInput,
  Form,
  FormGroup
} from "reactstrap";
import api from "../api";

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      phoneNumber: "",
      favoriteBooks: "",
      favoriteQuote: "",
      showEditForm: true,

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this)
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleFileChange(event) {
    console.log("The file added by the user is: ", event.target.files[0])
    this.setState({
      picture: event.target.files[0]
    })
  }

  handleFormSubmit(e){
    const uploadData = FormData() 
    uploadData.append("username", this.state.username)
    uploadData.append("picture", this.state.picture)
    uploadData.append("phoneNumber", this.state.phoneNumber)
    uploadData.append("favoriteBooks", this.state.favoriteBooks)
    uploadData.append("favoriteQuote", this.state.favoriteQuote)

    api.editProfile(uploadData)
      .then(result => {
        console.log("DID IT WORK???", result);
        this.props.updateProfile()
        this.setState({
          message: `Your profile was updated!`,
          showEditForm: !this.state.showEditForm,
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
}
  showEditForm() {
    this.setState({
      showEditForm: !this.state.showEditForm
    })
   
    }
  render() {
    return (
      <div className="editForm">
        {this.state.showEditForm ? (
          <Button onClick={e => this.showEditForm(e)} outline color="info" size="sm">
            Edit Profile
          </Button>
        ) : ( //ternary
          <Form>
            <FormGroup>
          {/* Conditional rendering to prevent not inputting any username */}
            <Label for="username">Username:{" "}</Label>
            {!this.state.username ? <div><Input invalid type="text" value={this.state.username} name="username" onChange={this.handleInputChange}
            />{" "}
            <FormFeedback>Oh noes! You have to write your username</FormFeedback></div> :
            <div><Input valid type="text" value={this.state.username} name="username" onChange={this.handleInputChange}
            />{" "}</div>}
            <Label for="picture">Picture:{" "}</Label>
            <CustomInput type="file" id="exampleCustomFileBrowser" name="picture" label="Bring that smile on!" />
            {" "}<br />
            <Label for="phoneNumber">Phone:{" "}</Label>
            <Input type="text" value={this.state.phoneNumber} name="phoneNumber" cols="20" rows="5" onChange={this.handleInputChange}
            />{" "}<br />
            </FormGroup>
            <FormGroup>
            <Label for="favoriteBooks">Favorite Books:{" "}</Label>
            <Input type="text" value={this.state.favoriteBooks} name="favoriteBooks" cols="20" rows="5" onChange={this.handleInputChange}
            />{" "}<br />
            <Label for="favoriteQuote">Favorite Quote:{" "}</Label>
            <Input type="text" value={this.state.favoriteQuote} name="favoriteQuote" cols="20" rows="5" onChange={this.handleInputChange}
            />{" "}<br />
            </FormGroup>
        {/* Show disabled button if there is no username  -> Ternary*/}
            {!this.state.username ? <Button disabled outline color="info" onClick={() => this.handleFormSubmit()}>
              Confirm
            </Button> :
            <Button outline color="info" onClick={() => this.handleFormSubmit()}>
              Confirm
            </Button>}
        </Form>)}
      </div>
    );
  }
}