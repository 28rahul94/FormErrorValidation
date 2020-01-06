import React from "react";
import "./Validation.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fName: "",
      lName: "",
      password: "",
      email: "",

      fValue: "",
      lValue: "",
      PValue: "",
      EValue: "",

      passwordMenuVisibility: "hidden"
    };
  }

  clickHandler = () => {
    //----------------------first name------------------//
    if (this.state.fName.length === 0)
      this.setState({ fValue: "Please fill the field" });
    else {
      this.setState({ fValue: "" });
      var b1 = true;
    }
    //---------------------last name------------------//
    if (this.state.lName.length === 0)
      this.setState({ lValue: "Please fill the field" });
    else {
      this.setState({ lValue: "" });
      var b2 = true;
    }

    //-----------------------password-------------------//

    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if (
      !(
        this.state.password.match(upperCaseLetters) &&
        this.state.password.match(lowerCaseLetters) &&
        this.state.password.match(numbers) &&
        this.state.password.length >= 8
      )
    ) {
      this.setState({
        PValue:
          "Please enter the password according to the specified requirements"
      });
    } else {
      this.setState({ PValue: "" });
      var b3 = true;
    }

    if (this.state.password.length === 0)
      this.setState({ PValue: "Please fill the field" });

    //-----------------email----------------------------//
    var atposition = this.state.email.indexOf("@");
    var dotposition = this.state.email.lastIndexOf(".");

    if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= this.state.email.length
    )
      this.setState({ EValue: "Please enter a valid e-mail address" });
    else {
      this.setState({ EValue: "" });
      var b4 = true;
    }

    if (this.state.email.length === 0) {
      this.setState({ EValue: "Please fill the field" });
    }

    if (b1 && b2 && b3 && b4) {
      alert("form submitted");
    }
  };

  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });

    if (nam === "fName") {
      if (val.length > 0) {
        this.setState({ fValue: "" });
      } else {
        this.setState({ fValue: "Please fill the field" });
      }
    }

    if (nam === "lName") {
      if (val.length > 0) {
        this.setState({ lValue: "" });
      } else {
        this.setState({ lValue: "Please fill the field" });
      }
    }

    if (nam === "password") {
      if (val.length > 0) {
        this.setState({ PValue: "" });
      } else {
        this.setState({ PValue: "Please fill the field" });
      }
    }

    if (nam === "email") {
      var atposition = val.indexOf("@");
      var dotposition = val.lastIndexOf(".");

      if (
        atposition < 1 ||
        dotposition < atposition + 2 ||
        dotposition + 2 >= val.length
      )
        this.setState({ EValue: "Please enter a valid e-mail address" });
      else this.setState({ EValue: "" });

      if (val.length === 0) {
        this.setState({ EValue: "Please fill the field" });
      }
    }
  };

  focusHandler = () => {
    this.setState({
      passwordMenuVisibility: "visible"
    });
  };

  blurHandler = () => {
    this.setState({
      passwordMenuVisibility: "hidden"
    });
  };
  keyUpHandler = (letter, capital, number, length) => {
    var lowerCaseLetters = /[a-z]/g;
    if (this.state.password.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (this.state.password.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (this.state.password.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate length
    if (this.state.password.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  };

  render() {
    console.log(this.state);
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");

    return (
      <div className="App">
        <form noValidate>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="fName"
              value={this.state.fName}
              onChange={this.myChangeHandler}
            />
            <span className="inputValues">{this.state.fValue}</span>
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lName"
              value={this.state.lName}
              onChange={this.myChangeHandler}
            />
            <span className="inputValues">{this.state.lValue}</span>
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="psw"
              value={this.state.password}
              onChange={this.myChangeHandler}
              onFocus={this.focusHandler}
              onBlur={this.blurHandler}
              onKeyUp={() => this.keyUpHandler(letter, capital, number, length)}
            />
            <span className="inputValues">{this.state.PValue}</span>
          </div>

          <div>
            <label>email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.myChangeHandler}
            />
            <span className="inputValues">{this.state.EValue}</span>
          </div>
        </form>
        <div>
          <button onClick={this.clickHandler}>Click to see validation</button>
        </div>
        <div
          style={{ visibility: this.state.passwordMenuVisibility }}
          id="message"
        >
          <h3>Password must contain the following:</h3>
          <p id="letter" className="invalid">
            A <b>lowercase</b> letter
          </p>
          <p id="capital" className="invalid">
            A <b>capital (uppercase)</b> letter
          </p>
          <p id="number" className="invalid">
            A <b>number</b>
          </p>
          <p id="length" className="invalid">
            Minimum <b>8 characters</b>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
