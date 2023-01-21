import React from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { Colxx } from 'components/bootstrap/CustomBootstrap';
import moment from 'jalali-moment';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';

const Item = ({ item, sheetState, repaireMan, onSelectedChange }) => {
  const [canEdit, setCanEdit] = React.useState(false);
  return (
    <Colxx
      sm="6"
      md="4"
      lg="3"
      className="mb-2"
      onMouseOver={() => {
        setCanEdit(true);
      }}
      onMouseLeave={() => {
        setCanEdit(false);
      }}
      onDoubleClick={() => {
        onSelectedChange(item);
      }}

      style={{
        cursor: 'pointer',
      }}
    >
      <Card
        style={{
          background: `${sheetState ? sheetState.color : "#FFF"}`,
        }}
      >
        {canEdit && (
          <div
            style={{
              width: 35,
              position: 'absolute',
              top: 5,
              cursor: 'pointer',
            }}
            onClick={() => {
              onSelectedChange(item);
            }}
          >
            <CreateTwoToneIcon
              style={{ color: 'rgb(75, 0, 50)' }}
              fontSize="small"
            />
          </div>
        )}
        <CardBody>
          <Row>
            <div>
              <p className="lead text-dark">
                {sheetState ? sheetState.title : ""}
              </p>
              <p className="text-small text-dark">
                {moment(item.date1).locale('fa').format('YYYY/MM/DD')}
                {item.date2
                  ? '  /  ' +
                    moment(item.date2).locale('fa').format('YYYY/MM/DD')
                  : ''}
              </p>
              {item.profileId ? (
                <p className="text-small text-dark">
                  {repaireMan ? repaireMan.name : ""}
                </p>
              ) : (
                <></>
              )}
              <p className="text-small text-dark">{item.comment}</p>
            </div>
          </Row>
        </CardBody>
      </Card>
    </Colxx>
  );
};
export default React.memo(Item);
