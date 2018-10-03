var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var ReputationChecker = function (_React$Component) {_inherits(ReputationChecker, _React$Component);
  function ReputationChecker(props) {_classCallCheck(this, ReputationChecker);var _this = _possibleConstructorReturn(this, (ReputationChecker.__proto__ || Object.getPrototypeOf(ReputationChecker)).call(this,
    props));_this.











    handleChange = function (event) {
      _this.setState({ input: event.target.value });
    };_this.

    loadAccount = function (event) {
      event.preventDefault();
      var url = _this.state.input;
      var selector = {
        airbnb: "reviews",
        ebay: "feedback_ratings",
        stackoverflow: "user-card" };

      _this.setState({ url: _this.state.input, input: "", fetchingData: true });
      var that = _this;
      $.getJSON(
      "https://allorigins.me/get?url=" +
      encodeURIComponent(url) +
      "&callback=?",
      function (data) {
        that.setState({
          response: data.contents,
          displayPage: true,
          fetchingData: false,
          reputation: "" });

        var div = document.createElement("div");
        div.innerHTML = data.contents;
        var reputationWebsite = false;
        for (var x in selector) {
          if (url.includes(x)) {
            reputationWebsite = true;
            div = document.getElementById(selector[x]);
          }
        }
        if (reputationWebsite) {
          that.setState({ reputation: div.outerHTML });
          console.log("Reputation as an HTML string: "+div.outerHTML)
        } else {
          that.setState({ reputation: "" });
        }
      });

    };_this.

    postData = function (event) {
      event.preventDefault();
      var url = _this.state.url;
      var reputation = _this.state.reputation;
      axios.post("https://imaginary.com/imaginary/", { url: url, reputation: reputation });
      //.then(res=>console.log(res))
      // .catch()
    };_this.state = { input: "", url: "", fetchingData: false, displayPage: false, reputation: "" };_this.loadAccount = _this.loadAccount.bind(_this);_this.postData = _this.postData.bind(_this);return _this;}_createClass(ReputationChecker, [{ key: "render", value: function render()

    {var _this2 = this;
      return (
        React.createElement("div", { className: "container" },
          React.createElement("h4", { className: "text-center my-4 display-4" }, "Reputation checker"),
          React.createElement("div", { className: "containter bg-info rounded mb-3" },
            React.createElement("form", { className: "form-inline d-flex justify-content-center py-4" },
              React.createElement("label", null,
                React.createElement("h5", null, "Get your reputation from a webpage:"),
                React.createElement("input", {
                  type: "url",
                  name: "url",
                  onChange: this.handleChange,
                  className: "form-control mx-3",
                  placeholder: "Some URL...",
                  value: this.state.input })),


              React.createElement("button", {
                  type: "submit",
                  className: "btn btn-primary",
                  onClick: function onClick(e) {return _this2.loadAccount(e);} }, "Load account")),




            this.state.fetchingData ?
            React.createElement("div", { className: "text-center py-4" }, "Fetching data...") :
            this.state.displayPage ?
            React.createElement("div", { className: "d-flex flex-column justify-content-center text-center" },
              React.createElement("h5", { className: "h5" }, "The webpage you asked"),
              React.createElement("div", {
                dangerouslySetInnerHTML: { __html: this.state.response },
                style: {
                  width: "95%",
                  height: 300,
                  marginLeft: "2.5%",
                  overflowY: "scroll",
                  backgroundColor: "white" },

                className: "my-4" })) :


            null, " ",
            this.state.reputation ?
            React.createElement("div", { className: "d-flex flex-column justify-content-center text-center" },
              React.createElement("h5", { className: "my-4 h5" }, "Your reputation"),

              React.createElement("div", {
                dangerouslySetInnerHTML: { __html: this.state.reputation },
                style: {
                  width: "95%",
                  height: 300,
                  marginLeft: "2.5%",
                  overflowY: "scroll",
                  backgroundColor: "white" } }),


              React.createElement("button", {
                  className: "btn btn-success my-4 mx-auto w-25",
                  onClick: function onClick(e) {return _this2.postData(e);} }, "I confirm this is my account")) :




            null)));



    } }]);return ReputationChecker;}(React.Component);


ReactDOM.render(React.createElement(ReputationChecker, null), document.getElementById("app"));
