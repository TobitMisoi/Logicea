import { PageContainer,ProTable } from "@ant-design/pro-components";
import { Link,useLocation, useModel } from "@umijs/max";
import { Button } from "antd";
import moment from "moment";
import { queryJokes } from "./services";

const Jokes = () => {
  function isBetween(number: number, min: number, max: number) {
    return min <= number && number <= max;
  }

  const {pathname} = useLocation()
  const { initialState, setInitialState } = useModel('@@initialState');
 
  return (
    <PageContainer
      extra={
        <Button
          type="primary"
          onClick={() =>
            setInitialState((prev:any) => ({
              ...prev,
              settings: {
                ...prev?.settings,
                navTheme: initialState?.settings?.navTheme === 'realDark' ? 'light' : 'realDark',
              },
            }))
          }
        >
          {initialState?.settings?.navTheme === 'realDark' ? 'Light' : 'Dark'}
        </Button>
      }
    >
      <ProTable
        headerTitle={
          <Link to="/jokes/joke">
            <Button>Add Joke</Button>
          </Link>
        }
        columns={[
          {
            title: 'Title',
            renderText: (text: any) => <Link to={`${pathname}/${text?.id}`}>{text?.Title}</Link>,
          },
          { title: 'Author', dataIndex: 'Author' },
          {
            title: 'Created Date',
            dataIndex: 'CreatedAt',
            renderText: (text) => moment(text).format('DD MMM YYYY'),
          },
          {
            title: 'Views',
            dataIndex: 'Views',
            renderText: (text) => {
              let color;
              if (isBetween(text, 0, 25)) color = 'tomato';
              if (isBetween(text, 26, 50)) color = 'orange';
              if (isBetween(text, 51, 75)) color = 'yellow';
              if (isBetween(text, 76, 100)) color = 'green';

              return <span style={{ color: color }}>{text}</span>;
            },
          },
        ]}
        search={false}
        request={async (params) => {
          return queryJokes({
            _limit: params.pageSize,
            _page: params.current,
          });
        }}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
          pageSizeOptions: [5, 10, 20],
        }}
      />
    </PageContainer>
  );
}

export default Jokes;