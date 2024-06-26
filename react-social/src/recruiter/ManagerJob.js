import React from "react";
import Nav from "./Nav";
import { Link, Redirect } from "react-router-dom";
import SidebarNav from "./SidebarNav";
import {
  delete2JobById,
  deleteJobById,
  getAllJobOfRecruiterById,
  getJob,
} from "../util/APIUtils";
import ModalBigContent from "../admin/modal/ModalBigContent";
import Alert from "react-s-alert";

class ManagerJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listJob: [],
      jobId: "",
      keyword: "",
    };
    this.handleInputChange = this.loadJob2.bind(this);
    this.loadJob = this.loadJob.bind(this);
  }
  loadJob2() {
    getJob(1, 1000, this.state.keyword)
      .then((response) => {
        console.log("Response:", response);
        this.setState({
          listJob: response.content,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue,
    });
  }
  loadJob() {
    getAllJobOfRecruiterById()
      .then((response) => {
        console.log("Response:", response);
        this.setState({
          listJob: response.content,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }

  handleGetId = (id) => {
    this.setState({
      jobId: id,
    });
  };
  handleEditJob = (id) => {
    this.props.history.push("/recruitment/job/" + id);
  };

  handleDeleteById = (id) => {
    deleteJobById(id)
      .then()
      .catch((message) => {
        Alert.success("Thay đổi trạng thái công việc thành công");
        this.loadJob();
      });
  };

  handleDelete2ById = (id) => {
    // Hiển thị hộp thoại xác nhận
    const isConfirmed = window.confirm("Bạn có muốn xóa công việc này không?");

    // Nếu người dùng đã xác nhận, thực hiện xóa
    if (isConfirmed) {
      delete2JobById(id)
        .then()
        .catch((message) => {
          Alert.success("Xoá công việc thành công");
          this.loadJob();
        });
    }
  };

  componentDidMount() {
    this.loadJob();
  }
  render() {
    if (!this.props.authenticated || this.props.roleName !== "ROLE_RECRUITER") {
      return (
        <Redirect
          to={{
            pathname: "/login-recruiter",
            state: { from: this.props.location },
          }}
        />
      );
    }
    console.log("DATA:", this.state.listJob);
    let list = this.state.listJob;

    return (
      <div className="wrapper">
        <nav id="sidebar" className="sidebar js-sidebar">
          <div className="sidebar-content js-simplebar">
            <a className="sidebar-brand" href="/recruiter">
              <span className="align-middle">Nhà Tuyển Dụng</span>
            </a>
            <SidebarNav />
          </div>
        </nav>

        <div className="main">
          <Nav onLogout={this.props.onLogout} />

          <main className="content">
            <div className="container-fluid p-0">
              <h1 className="h3 mb-3">
                <strong>Dashboard</strong>
              </h1>
            </div>

            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Quản lý công việc</h5>

                {/* <input
                  type="text"
                  class="form-control"
                  name="keyword"
                  value={this.state.keyword}
                  onChange={this.handleInputChange}
                /> */}
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Tên Công ty</th>
                    <th style={{ width: "20%" }}>Tên Công Việc</th>
                    <th style={{ width: "10%" }}>Kinh nghiệm</th>
                    <th style={{ width: "15%" }}>Danh Mục</th>
                    <th class="d-none d-md-table-cell" style={{ width: "15%" }}>
                      Địa Chỉ
                    </th>
                    <th style={{ width: "10%" }}>Tình Trạng</th>
                    <th style={{ width: "25%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((job) => {
                    return (
                      <tr>
                        <td>{job.companyName}</td>
                        <td>{job.jobTitle}</td>
                        <td>{job.level}</td>
                        <td>{job.category && job.category.name}</td>
                        <td class="d-none d-md-table-cell">{job.address}</td>
                        <td style={{ color: "green" }}>
                          {job.status === "ENABLE" ? "Hiện Thị" : "Ẩn"}
                        </td>
                        <td class="table-action">
                          <a
                            href="#"
                            onClick={() => this.handleEditJob(job.id)}
                            data-toggle="modal"
                            data-target="#exampleModal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-edit-2 align-middle"
                            >
                              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                            </svg>
                          </a>
                          &nbsp;&nbsp;
                          {/* <a
                            href="#"
                            onClick={() => this.handleGetId(job.id)}
                            data-toggle="modal"
                            data-target=".bd-example-modal-lg"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 512 512"
                            >
                              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                            </svg>{" "}
                          </a>
                          &nbsp;&nbsp; */}
                          <a
                            href="#"
                            onClick={() => this.handleDeleteById(job.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                            </svg>
                          </a>
                          &nbsp;&nbsp;
                          <a
                            href="#"
                            onClick={() => this.handleDelete2ById(job.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-trash align-middle"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <ModalBigContent jobId={this.state.jobId} />
          </main>
        </div>
      </div>
    );
  }
}

export default ManagerJob;
