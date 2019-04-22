import React from "react";
import {
  Save,
  Star,
  SentimentSatisfiedSharp,
  LockOpen,
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    color: theme.palette.text.primary,
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: 32,
    marginRight: theme.spacing.unit * 2,
  },
});

const LandingPage = props => {
  return (
    <>
      <section className="bg-gradient" id="home">
        <div className="container mt-5">
          <h1>Daily Ideas App</h1>
          <p className="tagline">
            Train your brain and become more creative by coming up with daily
            new ideas!
          </p>
        </div>
        <div className="img-holder mt-3">
          <img src="images/iphonex.png" alt="phone" className="img-fluid" />
        </div>
      </section>

      <div className="section light-bg" id="features">
        <div className="container">
          <div className="section-title">
            <small>HIGHLIGHTS</small>
            <h3>Features</h3>
          </div>

          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="card features">
                <div className="card-body">
                  <div className="media">
                    <SentimentSatisfiedSharp className={props.classes.icon} />
                    <div className="media-body">
                      <h4 className="card-title">Simple</h4>
                      <p className="card-text">
                        {" "}
                        Think of a question and add your ideas{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="card features">
                <div className="card-body">
                  <div className="media">
                    <Save className={props.classes.icon} />
                    <div className="media-body">
                      <h4 className="card-title">Auto Save Across Devices</h4>
                      <p className="card-text">
                        Instantenous auto save. Never worry about losing your
                        ideas.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card features">
                <div className="card-body">
                  <div className="media">
                    <Star className={props.classes.icon} />
                    <div className="media-body">
                      <h4 className="card-title">Choose the best</h4>
                      <p className="card-text">
                        {" "}
                        See your best ideas of the week, month, year.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card features">
                <div className="card-body">
                  <div className="media">
                    <LockOpen className={props.classes.icon} />
                    <div className="media-body">
                      <h4 className="card-title">Open Source</h4>
                      <p className="card-text">
                        {" "}
                        All the code running the app it's open source.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section light-bg">
        <div className="container">
          <div className="section-title">
            <h3>Getting Started</h3>
          </div>

          <div className="row">
            <div className="col-md-8 d-flex align-items-center">
              <ul className="list-unstyled ui-steps">
                <li className="media">
                  <div className="circle-icon mr-4">1</div>
                  <div className="media-body">
                    <h5>Create an Account</h5>
                  </div>
                </li>
                <li className="media my-4">
                  <div className="circle-icon mr-4">2</div>
                  <div className="media-body">
                    <h5>Start thinking</h5>
                  </div>
                </li>
                <li className="media">
                  <div className="circle-icon mr-4">3</div>
                  <div className="media-body">
                    <h5>Build a habit of doing it</h5>
                  </div>
                </li>

                <li className="media">
                  <div className="circle-icon mr-4">4</div>
                  <div className="media-body">
                    <h5>Improve your creativity</h5>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <img
                src="images/iphonex.png"
                alt="iphone"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="my-5 text-center">
        <p className="mb-2">
          Created with love by{" "}
          <a href="https://obedparla.com"> Obed Marquez Parlapiano</a>
        </p>
      </footer>
    </>
  );
};

export default withStyles(styles)(LandingPage);
