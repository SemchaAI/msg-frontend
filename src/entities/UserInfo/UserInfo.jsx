import styles from "./userInfo.module.css";

import { ReactComponent as Add } from "./images/add.svg";
import { ReactComponent as Decline } from "./images/decline.svg";
import { ReactComponent as AddFriend } from "./images/addFriend.svg";
import { ReactComponent as Added } from "./images/added.svg";
import { ReactComponent as Remove } from "./images/remove.svg";

import cn from "classnames";
import { Avatar } from "../../features/avatar/Avatar";
import { FormStatus } from "../../features/formStatus/FormStatus";
import { useMeProfile } from "./hooks/useMeProfile";
import { userApi } from "../services/userServices";
import { API_URL } from "../../shared/config";

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

  const [addFriend, { error: addFriendError }] = userApi.useAddFriendMutation();
  const [deleteFriend, { error: deleteFriendError }] =
    userApi.useDeleteFriendMutation();
  const { data: MeData } = userApi.useGetMeQuery(null, {
    pollingInterval: 2000,
  });

  const Valid = (MeData, data) => {
    let verifyFriends = MeData.friends.filter(
      (el) => String(el.userId) === String(data._id)
    );
    if (verifyFriends.length > 0) {
      verifyFriends = true;
    } else verifyFriends = false;

    let verifyFriendsReq = MeData.friendsReq.filter(
      (el) => String(el.user) === String(data._id)
    );
    if (verifyFriendsReq.length > 0) {
      verifyFriendsReq = true;
    } else verifyFriendsReq = false;
    return [verifyFriends, verifyFriendsReq].includes(true);
  };
  // const validation = Valid(MeData, data)

  const clickHandler = async (val) => {
    await addFriend({
      id: data._id,
      nickname: MeData.nickname,
      email: MeData.email,
      avatarUrl: MeData.avatarUrl,
      gender: MeData.gender,
    });
  };
  const clickHandler2 = async (val) => {
    await deleteFriend(val);
  };

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
                      <div className={styles.nickname}>
                        <h3>{data.nickname}</h3>
                        {MeData && Valid(MeData, data) === false ? (
                          <button onClick={clickHandler}>
                            <AddFriend className={styles.svg} />
                          </button>
                        ) : (
                          <div className={styles.svg}>
                            <Added />
                          </div>
                        )}
                      </div>
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
          {data.flag && MeData && (
            <>
              {/* <div className="inProcess">Here will be some settings in future</div> */}
              {data.friendsReq.length > 0 ? (
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
                <div className={styles.listH3}>No requests</div>
              )}
              <h4 className={styles.h4}>Friends</h4>
              <ul className={`${styles.listCard} ${styles.listCard2}`}>
                {MeData.friends.map((el) => (
                  <li key={el._id} className={styles.listCardBlock}>
                    <Avatar data={el} size={40} />
                    <div className={styles.cardInfo}>
                      <h3 className={styles.nickname}>{el.nickname}</h3>
                      <div>Here will be something</div>
                    </div>
                    <Remove
                      className={styles.svg}
                      onClick={() => clickHandler2(el.userId)}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
};
