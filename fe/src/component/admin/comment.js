import React, { Component } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import axios from "axios";
import { url } from "../constant";
export default class comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      arrCmt: "",
      arrCmt1: "",
    };
  }

  componentWillMount() {
    const product = this.props.location.state.product;
    this.setState({
      product: { ...product },
      arrCmt: [...product.arrCmt],
      arrCmt1: [...product.arrCmt],
    });
  }
  onChange = (e) => {
    const value = e.target.value;
    const arrCmt = this.state.arrCmt;

    var arrCmt1 = [];
    if (value === "1") {
      this.setState({ arrCmt1: arrCmt });
    } else if (value === "2") {
      arrCmt1 = arrCmt.filter((cmt) => cmt.vote >= 3);
      this.setState({ arrCmt1: arrCmt1 });
    } else {
      arrCmt1 = arrCmt.filter((cmt) => cmt.vote < 3);
      this.setState({ arrCmt1: arrCmt1 });
    }
  };
  removeComment = async (comment) => {
    var product = this.state.product;
    let { arrCmt1 } = this.state;

    arrCmt1 = arrCmt1.filter((cmt) => cmt.content !== comment.content);
    product.arrCmt = [...arrCmt1];
    this.setState({
      arrCmt1,
    });
    await axios.put(`${url}/product`, product);
    alert("Xóa bình luận thành công!")
  };
  render() {
    const arrCmt1 = this.state.arrCmt1;

    const showCmt = () => {
      return arrCmt1.reverse().map((cmt, i) => {
        return (
          <div className="media" key={i}>
            <Link className="pull-left" to="#">
              <img
                style={{ width: 100, height: 100 }}
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
            </Link>
            <div className="media-body">
              <h4 className="media-heading">{cmt.name}</h4>
              <StarRatings
                rating={cmt.vote}
                starDimension="20px"
                numberOfStars={5}
                name="rating"
                starRatedColor="red"
              />
              <p>{cmt.content}</p>

              <ul className="list-unstyled list-inline media-detail pull-left">
                <li>
                  <i className="fa fa-calendar" />
                  {cmt.dateCre}
                </li>
              </ul>
            </div>
            <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={() => this.removeComment(cmt)}
            ></i>
          </div>
        );
      });
    };
    return (
      <div>
        <h1>Quản lý comment</h1>
        <label htmlFor="exampleInputEmail1">
          Tên sản phẩm:{this.state.name}
        </label>
        <img
          src={this.state.img}
          alt="..."
          style={{ width: 200, height: 200 }}
        ></img>
        <div className="form-group">
          <label htmlFor="sel1">Chọn loại</label>
          <select className="form-control" id="sel1" onChange={this.onChange}>
            <option value="1">Tất cả bình luận</option>
            <option value="2">Bình luận tốt</option>
            <option value="3">Bình luận xấu</option>
          </select>
        </div>
        {showCmt()}
      </div>
    );
  }
}
