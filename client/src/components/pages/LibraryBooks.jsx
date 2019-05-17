import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import api from "../../api";



export default class LibraryBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        library: {},
        book: {}
      },
      member: [],
      search: ""
    };
    this.changeSearch = this.changeSearch.bind(this);
  }

  changeSearch(e) {
    this.setState({
      search: e.target.value
    });
  }

  render() {
    return (
      <div className="LibraryBooks">
        {!this.state.book && <div>Loading...</div>}
        {this.state.book && (
          <div>
            <Button color="primary">Go Back to My Library</Button>
            <h1>{this.state.library.name}</h1>
            <h2>List of Books / Book Details</h2>
            <p>
              <input
                type="text"
                value={this.state.search}
                onChange={this.changeSearch}
              />
            </p>
            <Button color="primary">ADD BOOK</Button>
            <br />

            {/* <h3>{this.state.boo}</h3> */}
            <ul>
              {this.state.book
                .filter(bookDetail =>
                  bookDetail.title
                    .toUpperCase()
                    .includes(this.state.search.toUpperCase())
                )
                .map(bookDetail => (
                  <li key={bookDetail._id}>
                  <div>
                    <Card>
                      <CardImg top width="100%" src={bookDetail.picture} alt={`"${bookDetail.title}-cover"`} />
                      <CardBody>
                        <CardTitle>Title:{bookDetail.title}</CardTitle>
                        <CardTitle>Author:{bookDetail.author}</CardTitle>
                        <CardSubtitle>Genre:{bookDetail.genre}</CardSubtitle>
                        <CardText>{bookDetail.description}</CardText>
                        <Button color="danger">Delete</Button>
                      </CardBody>
                    </Card>
                  </div>
                  <br />
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    // console.log(this.props.match)
    api
      .getLibrary(this.props.match.params.libraryId)

      .then(response => {
        console.log("response------->", response);
        this.setState({
          library: response.library,
          book: response.book
        });
      })
      .catch(err => console.log(err));
  }
}
