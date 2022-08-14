import { FunctionComponent } from "react";

interface ToolboxProps {
  addText: (text: string) => void;
  addJustTweet: () => void;
  addImage: () => void;
  addTTSTweet: () => void;
}

const Toolbox: FunctionComponent<ToolboxProps> = ({
  addText,
  addImage,
  addJustTweet,
  addTTSTweet,
}) => {
  return (
    <div className="p-4 mt-auto">
      <div>Elements</div>
      <div className="grid grid-cols-3 gap-4 my-4 ">
        <div
          onClick={() => {
            let txt = prompt("What does the text say?");
            if (txt) {
              addText(txt);
            } else {
              alert("Text Empty");
            }
          }}
          className="rounded-xl hover:scale-95 transition-all hover:bg-slate-700 cursor-pointer flex flex-col gap-4 items-center justify-center p-10 bg-slate-800"
        >
          <div className="font-bold text-4xl  opacity-50">
            <svg
              width="115"
              height="48"
              viewBox="0 0 115 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.54261 39H0.951705L10.9943 9.90909H18.9205L28.9489 39H22.358L15.071 16.5568H14.8438L7.54261 39ZM7.13068 27.5653H22.6989V32.3665H7.13068V27.5653ZM38.5582 39.4119C37.1662 39.4119 35.9257 39.1705 34.8366 38.6875C33.7476 38.1951 32.8859 37.4706 32.2514 36.5142C31.6264 35.5483 31.3139 34.3456 31.3139 32.9062C31.3139 31.6941 31.5365 30.6761 31.9815 29.8523C32.4266 29.0284 33.0327 28.3655 33.7997 27.8636C34.5668 27.3617 35.438 26.983 36.4134 26.7273C37.3982 26.4716 38.4304 26.2917 39.5099 26.1875C40.7789 26.0549 41.8016 25.9318 42.5781 25.8182C43.3546 25.6951 43.9181 25.5152 44.2685 25.2784C44.6188 25.0417 44.794 24.6913 44.794 24.2273V24.142C44.794 23.2424 44.5099 22.5464 43.9418 22.054C43.383 21.5616 42.5876 21.3153 41.5554 21.3153C40.4664 21.3153 39.5999 21.5568 38.956 22.0398C38.312 22.5133 37.8859 23.1098 37.6776 23.8295L32.081 23.375C32.3651 22.0492 32.9238 20.9034 33.7571 19.9375C34.5904 18.9621 35.6652 18.214 36.9815 17.6932C38.3073 17.1629 39.8414 16.8977 41.5838 16.8977C42.7959 16.8977 43.956 17.0398 45.0639 17.3239C46.1813 17.608 47.1709 18.0483 48.0327 18.6449C48.9039 19.2415 49.5904 20.0085 50.0923 20.946C50.5942 21.8741 50.8452 22.9867 50.8452 24.2841V39H45.1065V35.9744H44.9361C44.5857 36.6562 44.117 37.2576 43.5298 37.7784C42.9427 38.2898 42.2372 38.6922 41.4134 38.9858C40.5895 39.2699 39.6378 39.4119 38.5582 39.4119ZM40.2912 35.2358C41.1813 35.2358 41.9673 35.0606 42.6491 34.7102C43.331 34.3504 43.866 33.8674 44.2543 33.2614C44.6425 32.6553 44.8366 31.9687 44.8366 31.2017V28.8864C44.6473 29.0095 44.3868 29.1231 44.0554 29.2273C43.7334 29.322 43.3688 29.4119 42.9616 29.4972C42.5545 29.5729 42.1473 29.6439 41.7401 29.7102C41.3329 29.767 40.9635 29.8191 40.6321 29.8665C39.9219 29.9706 39.3016 30.1364 38.7713 30.3636C38.241 30.5909 37.8291 30.8987 37.5355 31.2869C37.242 31.6657 37.0952 32.1392 37.0952 32.7074C37.0952 33.5312 37.3935 34.161 37.9901 34.5966C38.5961 35.0227 39.3632 35.2358 40.2912 35.2358ZM54.5028 39L59.3324 9.90909H69.9858C72.0502 9.90909 73.7027 10.25 74.9432 10.9318C76.1932 11.6042 77.0549 12.518 77.5284 13.6733C78.0019 14.8191 78.1155 16.1117 77.8693 17.5511C77.6705 18.7633 77.2775 19.7812 76.6903 20.6051C76.1127 21.429 75.4119 22.0919 74.5881 22.5938C73.7642 23.0956 72.8977 23.4602 71.9886 23.6875L71.9318 23.9716C72.8788 24.0189 73.7642 24.3314 74.5881 24.9091C75.4214 25.4773 76.0559 26.2869 76.4915 27.3381C76.9271 28.3892 77.0265 29.6676 76.7898 31.1733C76.5341 32.66 75.9564 33.9953 75.0568 35.179C74.1667 36.3532 72.9403 37.286 71.3778 37.9773C69.8153 38.6591 67.9072 39 65.6534 39H54.5028ZM59.517 35.2358H65.8523C67.9545 35.2358 69.5265 34.8286 70.5682 34.0142C71.6193 33.1998 72.2538 32.1818 72.4716 30.9602C72.6136 30.0417 72.5142 29.1989 72.1733 28.4318C71.8419 27.6648 71.2831 27.054 70.4972 26.5994C69.7206 26.1449 68.7453 25.9176 67.571 25.9176H61.0795L59.517 35.2358ZM61.6619 22.4943H67.5284C68.5133 22.4943 69.4318 22.3049 70.2841 21.9261C71.1458 21.5473 71.8608 21.0123 72.429 20.321C73.0066 19.6297 73.3665 18.8201 73.5085 17.892C73.7169 16.6799 73.4659 15.6714 72.7557 14.8665C72.0549 14.0521 70.8381 13.6449 69.1051 13.6449H63.1108L61.6619 22.4943ZM80.6747 39L85.5043 9.90909H89.7514L87.9759 20.7188H88.2315C88.5535 20.2642 88.9938 19.7386 89.5526 19.142C90.1207 18.5455 90.8546 18.0246 91.7543 17.5795C92.6539 17.125 93.7808 16.8977 95.1349 16.8977C96.8963 16.8977 98.3925 17.3428 99.6236 18.233C100.855 19.1231 101.726 20.4062 102.237 22.0824C102.749 23.7585 102.81 25.7756 102.422 28.1335C102.034 30.4915 101.304 32.5133 100.234 34.1989C99.1738 35.875 97.8812 37.1676 96.3565 38.0767C94.8319 38.9763 93.1889 39.4261 91.4276 39.4261C90.1018 39.4261 89.0554 39.2036 88.2884 38.7585C87.5308 38.3134 86.9626 37.7926 86.5838 37.196C86.2145 36.5994 85.9351 36.0691 85.7457 35.6051H85.3906L84.8224 39H80.6747ZM86.6548 28.0909C86.4086 29.625 86.4086 30.9697 86.6548 32.125C86.9105 33.2803 87.4077 34.1847 88.1463 34.8381C88.8944 35.482 89.8745 35.804 91.0866 35.804C92.3556 35.804 93.473 35.4678 94.4389 34.7955C95.4048 34.1136 96.2003 33.1903 96.8253 32.0256C97.4503 30.8608 97.8859 29.5492 98.1321 28.0909C98.3594 26.6515 98.3546 25.3589 98.1179 24.2131C97.8812 23.0672 97.3887 22.1629 96.6406 21.5C95.902 20.8371 94.8935 20.5057 93.6151 20.5057C92.384 20.5057 91.2902 20.8229 90.3338 21.4574C89.3774 22.0919 88.5866 22.9773 87.9616 24.1136C87.3366 25.25 86.901 26.5758 86.6548 28.0909Z"
                fill="white"
              />
              <g clipPath="url(#clip0_25_2)">
                <path
                  d="M105.72 26.4383C105.323 26.4383 105 26.1107 105 25.7074C105 25.3042 105.323 24.9766 105.72 24.9766H109.064V16.7927C108.961 15.7833 108.656 15.0347 108.191 14.5066C107.686 13.9317 106.968 13.5953 106.099 13.4504C105.709 13.3858 105.443 13.0115 105.507 12.6127C105.571 12.2161 105.939 11.9465 106.332 12.0111C107.519 12.2094 108.522 12.6951 109.259 13.5351C109.448 13.749 109.617 13.9852 109.766 14.2414C109.955 13.9094 110.179 13.6176 110.435 13.3591C111.205 12.5837 112.237 12.1604 113.468 12.0044C113.863 11.9554 114.22 12.2406 114.269 12.6416C114.317 13.0427 114.036 13.4059 113.641 13.4549C112.72 13.5708 111.971 13.8649 111.447 14.393C110.927 14.9166 110.598 15.6964 110.503 16.7949V24.9744H113.9C114.297 24.9744 114.62 25.3019 114.62 25.7052C114.62 26.1085 114.297 26.4361 113.9 26.4361H110.503V34.5821C110.598 35.6806 110.927 36.4627 111.447 36.9841C111.971 37.5099 112.72 37.8063 113.641 37.9221C114.036 37.9711 114.317 38.3366 114.269 38.7354C114.22 39.1365 113.863 39.4217 113.468 39.3726C112.237 39.2167 111.205 38.7933 110.435 38.0179C110.179 37.7595 109.955 37.4676 109.766 37.1356C109.617 37.394 109.448 37.628 109.259 37.8419C108.52 38.6819 107.517 39.1676 106.332 39.366C105.941 39.4306 105.573 39.161 105.507 38.7644C105.443 38.3677 105.709 37.9934 106.099 37.9266C106.968 37.7817 107.686 37.4453 108.191 36.8704C108.656 36.3424 108.961 35.5915 109.064 34.5844V26.4383H105.72Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_25_2">
                  <rect
                    width="9.61979"
                    height="27.3794"
                    fill="white"
                    transform="translate(105 12)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>Text</div>
        </div>
        <div
          onClick={addImage}
          className="rounded-xl hover:scale-95 transition-all hover:bg-slate-700 cursor-pointer flex flex-col gap-4 items-center justify-center p-10 bg-slate-800"
        >
          <div className="font-bold text-4xl opacity-50">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <div>Image</div>
        </div>
        <div
          onClick={addJustTweet}
          className="rounded-xl hover:scale-95 transition-all hover:bg-slate-700 cursor-pointer flex flex-col gap-4 items-center justify-center p-10 bg-slate-800"
        >
          <div className="font-bold  text-4xl opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </div>
          <div>Just Tweet</div>
        </div>
        <div
          onClick={addTTSTweet}
          className="rounded-xl hover:scale-95 transition-all hover:bg-slate-700 cursor-pointer flex flex-col gap-4 items-center justify-center p-10 bg-slate-800"
        >
          <div className="font-bold text-4xl opacity-50">
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 2.309C23.117 2.701 22.168 2.965 21.172 3.084C22.189 2.475 22.97 1.51 23.337 0.36C22.386 0.924 21.332 1.334 20.21 1.555C19.313 0.598 18.032 0 16.616 0C13.437 0 11.101 2.966 11.819 6.045C7.728 5.84 4.1 3.88 1.671 0.901C0.381 3.114 1.002 6.009 3.194 7.475C2.388 7.449 1.628 7.228 0.965 6.859C0.911 9.14 2.546 11.274 4.914 11.749C4.221 11.937 3.462 11.981 2.69 11.833C3.316 13.789 5.134 15.212 7.29 15.252C5.22 16.875 2.612 17.6 0 17.292C2.179 18.689 4.768 19.504 7.548 19.504C16.69 19.504 21.855 11.783 21.543 4.858C22.505 4.163 23.34 3.296 24 2.309V2.309Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.6298 11.8457C17.7394 11.8911 17.8331 11.968 17.899 12.0667C17.9649 12.1654 18 12.2814 18 12.4001V19.6001C17.9999 19.7187 17.9647 19.8347 17.8988 19.9333C17.8329 20.032 17.7392 20.1089 17.6296 20.1543C17.5199 20.1997 17.3993 20.2115 17.283 20.1884C17.1666 20.1653 17.0597 20.1081 16.9758 20.0243L14.7516 17.8001H13.2C13.0408 17.8001 12.8882 17.7368 12.7757 17.6243C12.6632 17.5118 12.6 17.3592 12.6 17.2001V14.8001C12.6 14.6409 12.6632 14.4883 12.7757 14.3758C12.8882 14.2633 13.0408 14.2001 13.2 14.2001H14.7516L16.9758 11.9759C17.0597 11.8919 17.1666 11.8347 17.283 11.8115C17.3994 11.7884 17.5201 11.8002 17.6298 11.8457V11.8457ZM20.7942 11.7575C20.9067 11.645 21.0593 11.5818 21.2184 11.5818C21.3775 11.5818 21.5301 11.645 21.6426 11.7575C22.2005 12.3141 22.6429 12.9754 22.9445 13.7034C23.2461 14.4315 23.4009 15.212 23.4 16.0001C23.4009 16.7881 23.2461 17.5686 22.9445 18.2967C22.6429 19.0247 22.2005 19.6861 21.6426 20.2427C21.5294 20.352 21.3779 20.4124 21.2205 20.4111C21.0632 20.4097 20.9127 20.3466 20.8015 20.2353C20.6902 20.1241 20.6271 19.9736 20.6258 19.8163C20.6244 19.659 20.6849 19.5074 20.7942 19.3943C21.2407 18.9491 21.5947 18.42 21.836 17.8375C22.0772 17.255 22.2009 16.6306 22.2 16.0001C22.2 14.6741 21.6636 13.4753 20.7942 12.6059C20.6817 12.4933 20.6185 12.3408 20.6185 12.1817C20.6185 12.0226 20.6817 11.87 20.7942 11.7575V11.7575ZM19.0968 13.4543C19.1525 13.3985 19.2187 13.3542 19.2915 13.324C19.3643 13.2938 19.4424 13.2783 19.5213 13.2783C19.6001 13.2783 19.6782 13.2938 19.751 13.324C19.8239 13.3542 19.8901 13.3985 19.9458 13.4543C20.2805 13.7883 20.5459 14.1851 20.7269 14.622C20.9078 15.0589 21.0006 15.5272 21 16.0001C21.0006 16.4729 20.9077 16.9412 20.7268 17.3781C20.5459 17.815 20.2805 18.2118 19.9458 18.5459C19.8332 18.6584 19.6805 18.7217 19.5213 18.7217C19.3621 18.7217 19.2094 18.6584 19.0968 18.5459C18.9842 18.4333 18.9209 18.2806 18.9209 18.1214C18.9209 17.9621 18.9842 17.8094 19.0968 17.6969C19.3201 17.4744 19.4972 17.2099 19.6179 16.9187C19.7385 16.6275 19.8004 16.3153 19.8 16.0001C19.8005 15.6848 19.7386 15.3726 19.6179 15.0814C19.4972 14.7902 19.3201 14.5257 19.0968 14.3033C19.041 14.2475 18.9967 14.1814 18.9665 14.1085C18.9363 14.0357 18.9208 13.9576 18.9208 13.8788C18.9208 13.7999 18.9363 13.7218 18.9665 13.649C18.9967 13.5762 19.041 13.51 19.0968 13.4543V13.4543Z"
                fill="#567BFF"
              />
            </svg>
          </div>
          <div>TTS Tweet</div>
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
