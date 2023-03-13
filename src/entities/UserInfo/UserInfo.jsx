import styles from "./userInfo.module.css";

import { ReactComponent as Add } from "./images/add.svg";
import { ReactComponent as Decline } from "./images/decline.svg";

import cn from "classnames";
import { Avatar } from "../../features/avatar/Avatar";
import { FormStatus } from "../../features/formStatus/FormStatus";
import { useMeProfile } from "./hooks/useMeProfile";
import { userApi } from "../services/userServices";

export const UserInfo = ({ idObj = "CurrentUser" }) => {
  //important feature, but firstly need to refactor all component  ////upd. 80%
  // example of data
  // {
  //   id: "63f9ea00d9a1b612d502efbd",
  // }
  const [
    data,
    inputFileRef,
    changeFileHandler,
    setStatusFlag,
    statusFlag,
    clickHandlerAdd,
    clickHandlerRemove,
  ] = useMeProfile(idObj);

  return (
    <>
      {data && (
        <>
          <section className={styles.allAboutUser}>
            <>
              <div className={styles.personalInfo}>
                {data.flag === false ? (
                  <>
                    <Avatar data={data} size={95} />
                    <div className={styles.userInfo}>
                      <h3>{data.nickname}</h3>
                      <h3 className={`${styles.email}`}>{data.email}</h3>
                      <h3 className={styles.text}>
                        Status: <p>{data.status}</p>
                      </h3>
                    </div>
                  </>
                ) : (
                  <>
                    <Avatar data={data} size={95} upload={inputFileRef} />
                    <input
                      ref={inputFileRef}
                      onChange={changeFileHandler}
                      type={"file"}
                      accept="image/x-png,image/gif,image/jpeg,image/svg+xml"
                      hidden
                    ></input>
                    <div className={styles.userInfo}>
                      <h3>{data.nickname}</h3>
                      <h3 className={`${styles.email}`}>{data.email}</h3>
                      {statusFlag ? (
                        <h3
                          className={styles.text}
                          onClick={() => setStatusFlag(!statusFlag)}
                        >
                          Status: <p>{data.status}</p>
                        </h3>
                      ) : (
                        <FormStatus
                          status={data.status}
                          func={setStatusFlag}
                          flag={statusFlag}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          </section>
          {data.flag && (
            <>
              {/* <div className="inProcess">Here will be some settings in future</div> */}
              {data.friendsReq ? (
                <>
                  <h3 className={styles.listH3}>Friend requests</h3>
                  <ul className={styles.listContainer}>
                    {data.friendsReq.map((val, index) => (
                      <li key={val._id} className={styles.listCard}>
                        <div className={styles.listCardBlock}>
                          <Avatar data={val} size={40} />
                          <div className={styles.cardInfo}>
                            <div className={styles.nickname}>
                              {val.nickname}
                            </div>
                            <div>{val.email}</div>
                          </div>
                        </div>
                        {/* {!data.friends.map((el) => el._id.includes(data.friends._id))
                  .length ? ( */}
                        <>
                          <button
                            onClick={() => clickHandlerAdd(val._id)}
                            className={styles.btnAdd}
                          >
                            <Add />
                          </button>
                          <button
                            onClick={() => clickHandlerRemove(val._id)}
                            className={styles.btnDecline}
                          >
                            <Decline />
                          </button>
                        </>
                        {/* ) : (
                  <div className={styles.added}>Added</div>
                )} */}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div>No requests</div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
