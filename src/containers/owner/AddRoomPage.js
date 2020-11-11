import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import roomActions from "../../redux/actions/roomActions";

const AddRoomPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let [roomImages, setRoomImages] = useState([]);

  // handle form submission---------
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const onFinish = (values) => {
    const { name, description, facilities, capacity, price } = values;
    dispatch(
      roomActions.addRoom(
        name,
        description,
        facilities,
        capacity,
        roomImages,
        price
      )
    );
    history.push("/rooms");
  };
  const onReset = () => {
    form.resetFields();
    setRoomImages("");
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  //end handle form submit-----

  //handle submit image ----
  const openWidget = () => {
    // create the widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloud_name: "ellenlinh",
        upload_preset: "gzkez3bx",
      },
      (error, result) => {
        if (result.event === "success") {
          let newImg = result.info.secure_url;
          setRoomImages([...roomImages, newImg]);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };
  //end submit img ------
  //        name,
  //       description,
  //       facilities,
  //       capacity,
  //       roomImages,
  //       price,
  return (
    <div>
      <div>
        <h1 className="horizontalCenter">Add room</h1>
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Room name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.List
            name="facilities"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 2) {
                    return Promise.reject(new Error("At least 2 facilities"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? "Facilities" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Please input passenger's name or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder="facility" style={{ width: "60%" }} />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item
                  wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 8, offset: 8 },
                  }}
                >
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "100%" }}
                    icon={<PlusOutlined />}
                  >
                    Add facilities
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item
            name="capacity"
            label="No.people"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input prefix="$" suffix="USD" />
          </Form.Item>

          <div className="horizontalCenter">
            {roomImages ? (
              roomImages.map((img) => (
                <img src={img} alt="" style={{ maxWidth: "50px" }} />
              ))
            ) : (
              <></>
            )}
            <div
              className="verticalCenter imgUpload"
              onClick={() => openWidget()}
            >
              <PlusOutlined />
              <p>Add image</p>
            </div>
          </div>
          <br />
          <div className="horizontalCenter">
            <Button type="primary" htmlType="submit">
              Create room
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset form
            </Button>
          </div>
        </Form>
        <br />
      </div>
    </div>
  );
};

export default AddRoomPage;
