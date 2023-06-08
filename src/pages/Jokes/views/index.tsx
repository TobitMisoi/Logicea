import {
PageContainer,
ProCard,
ProForm,
ProFormDigit,
ProFormText,
ProFormTextArea,
} from '@ant-design/pro-components';
import { history,useParams,useRequest } from '@umijs/max';
import { Button,Col,Popconfirm,Row,message } from 'antd';
import React from 'react';
import { addJoke,deleteJoke,queryJoke,updateJoke } from '../services';

const Joke = () => {
  const [editing, setEditing] = React.useState<boolean>();

  const { jokeId }: any = useParams();
  const { data, loading, refresh } = useRequest(
    async () => {
      let response: any = {};
      if (jokeId) {
        response = await queryJoke(jokeId, {});
      }

      return response;
    },
    { refreshDeps: [jokeId] },
  );
  const formRef = React.useRef();

  React.useEffect(() => {
    if (jokeId) {
      setEditing(true);
    }
  }, []);


  return (
    <PageContainer
      title="Jokes"
      subTitle={editing ? 'You are updating the joke' : 'Add a new joke'}
      breadcrumbRender={false}
      onBack={() => history.back()}
    >
      <Row gutter={[16, 16]}>
        <Col lg={editing ? 20 : 24}>
          <ProCard title={editing ? 'You are updating the joke' : 'Add a new joke'}>
            <div>
              {!loading && (
                <ProForm
                  formKey="v32"
                  onFinish={async (v: any) => {
                    console.log(v);
                    try {
                      if (editing) await updateJoke(jokeId, v);

                      if (!editing) {
                        const response = await addJoke(jokeId, v);
                        setEditing(true);
                        console.log(response);
                        history.push(`/jokes/${response?.data?.id}`);
                      }
                      refresh();
                      message.success('Joke updated successfully');
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  formRef={formRef}
                  submitter={{
                    submitButtonProps: {},
                    render: (props) => {
                      return [
                        <Button
                          type="default"
                          key="reset"
                          onClick={() => props.form?.resetFields()}
                        >
                          Reset
                        </Button>,
                        <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                          {editing ? 'Update' : 'Add new Joke'}
                        </Button>,
                      ];
                    },
                  }}
                >
                  <ProForm.Group>
                    <ProFormText
                      rules={[{ required: editing ? false : true }]}
                      width="lg"
                      label="Title"
                      name="Title"
                      initialValue={data?.Title}
                    />
                  </ProForm.Group>
                  <ProForm.Group>
                    <ProFormTextArea
                      width="lg"
                      label="Body"
                      name="Body"
                      placeholder="Type here..."
                      initialValue={data?.Body}
                    />
                  </ProForm.Group>
                  <ProForm.Group>
                    <ProFormText
                      width="lg"
                      label="Author"
                      name="Author"
                      initialValue={data?.Author}
                    />
                  </ProForm.Group>
                  <ProForm.Group>
                    <ProFormDigit
                      initialValue={data?.Views}
                      fieldProps={{ type: 'number' }}
                      width="lg"
                      label="Views"
                      name="Views"
                    />
                  </ProForm.Group>
                </ProForm>
              )}
            </div>
          </ProCard>
        </Col>
        {editing ? (
          <Col xs={24} sm={24} lg={4}>
            <ProCard title="Actions">
              <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={async () => {
                  try {
                    deleteJoke(jokeId);
                    message.success('Joke deleted successfully');
                    history.back();
                  } catch (error) {
                    return false;
                  }
                }}
              >
                <Button type="dashed" danger>
                  Delete Joke
                </Button>
              </Popconfirm>
            </ProCard>
          </Col>
        ) : null}
      </Row>
    </PageContainer>
  );
};

export default Joke;
