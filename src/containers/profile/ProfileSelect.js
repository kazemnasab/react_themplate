import * as React from "react";
import { Row, Input, Label, Button } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import { Colxx } from "components/bootstrap/CustomBootstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import Avatar from "@mui/joy/Avatar";
import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ProfileSelectByTarget from "./ProfileSelectByTarget";
import CreateOrUpdate from "./CreateOrUpdate";

function ProfileSelect({ setValue, onCallBack, customer }) {
  const [target, setTarget] = React.useState("agent");
  React.useEffect(() => {
    if (customer && customer.target) setTarget(customer.target.toLowerCase());
  }, [customer]);
  return (
    <>
      <Row className="mb-3">
        <Colxx sm="12" md="12" lg="12">
          <RadioGroup
            aria-label="platform"
            value={target}
            overlay
            name="platform"
            sx={{
              flexDirection: "row",
              gap: 2,
              [`& .${radioClasses.checked}`]: {
                [`& .${radioClasses.action}`]: {
                  inset: -1,
                  border: "3px solid",
                  borderColor: "primary.500",
                },
              },
              [`& .${radioClasses.radio}`]: {
                display: "contents",
                "& > svg": {
                  zIndex: 2,
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  bgcolor: "background.body",
                  borderRadius: "50%",
                },
              },
            }}
          >
            {[
              { value: "agent", label: "نمایندگان" },
              { value: "customer", label: "متفرقه" },
              { value: "new", label: "جدید" },
            ].map((value) => (
              <Sheet
                onClick={() => {
                  setTarget(value.value);
                }}
                key={value.value}
                variant="outlined"
                sx={{
                  borderRadius: "md",
                  bgcolor: "background.level1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1,
                  minWidth: 120,
                }}
              >
                <Radio
                  id={value.value}
                  value={value.value}
                  checkedIcon={
                    <CheckCircleRoundedIcon
                      style={{
                        color: "#096bde",
                        zIndex: 1000,
                        backgroundColor: "#FFF",
                      }}
                    />
                  }
                />
                <FormLabel htmlFor={value.value}>{value.label}</FormLabel>
              </Sheet>
            ))}
          </RadioGroup>
        </Colxx>
      </Row>
      <Row className="mb-2">
        {target == "new" ? (
          <CreateOrUpdate onCallBack={onCallBack} />
        ) : (
          <ProfileSelectByTarget
            customer={customer}
            setValue={setValue}
            onCallBack={onCallBack}
            target={target}
          />
        )}
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default injectIntl(connect(mapStateToProps, {})(ProfileSelect));
