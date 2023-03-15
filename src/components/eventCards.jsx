import "./styles/eventCards.css";
import concepts_logo from "../assets/images/concepts_logo.png";
import impetus_logo from "../assets/images/impetus_logo.png";
import pradnya_logo from "../assets/images/pradnya_logo.png";

const eventData = [
  {
    id: 1,
    name: "IMPETUS",
    fees: 200,
    members: "Max 5 members",
    prize: 1000,
    logo: impetus_logo,
    nt: "₹ 100/- For National Entries",
    it: "Free for International Entries",
    contact : [{
      name : "Apoorvaraj",
      phone : "8530191073",
    },
    {
      name: "Mrugank",
      phone : "7083823772"

    },
    {
      name: "Vrushali",
      phone : "9766176681"
    },
    {
      name: "Aarti",
      phone :  "9405119460",
    }
    ]
  },

  {
    id: 2,
    name: "CONCEPTS",
    fees: 300,
    members: "Max 5 members",
    prize: 1000,
    logo: concepts_logo,
    nt: "₹ 300/- For National Entries",
    it: "Free for International Entries",
    contact : [{
      name : "Siddhart",
      phone : "8237892072",
    },
    {
      name: "Kalpesh",
      phone : "7769945077"

    },
    {
      name: "Yamini",
      phone : "7385190784"
    },
    {
      name: "Vishakha",
      phone :  "9011628404",
    },
    ]
  },

  {
    id: 3,
    name: "PRADNYA",
    fees: 100,
    members: "Max 2 Members",
    prize: 1000,
    logo: pradnya_logo,
    nt: "₹ 100/- For National Entries",
    it: "Free for International Entries",
    contact : [{
      name : "Pratik",
      phone : "9145439727",
    },
    {
      name: "Neha",
      phone : "9579678142"

    },
    // {
    //   name: "Vrushali",
    //   phone : "9766176681"
    // },
    // {
    //   name: "Aarti",
    //   phone :  "9405119460",
    // }
    ]
  },
];

function Card(props) {
  return (
    <div className="card">
      {/* my card*/}
      <div className="py-8 mx-5 md:mx-0">
        <div className="md:h-[670px] shadow-md shadow-light_blue/20 hover:bg-light_blue hover:scale-105 transition ease-in-out  bg-light_blue/30 rounded-xl  border-light_blue items-center p-4 md:p-8 border md:mx-5  mt-10">
        <div className='flex'>
            <div className=''>
              <img src={props.logo}
              alt=""
              className="w-full" />
              </div>
            <div className="my-auto text-xl mr-10 md:text-3xl font-poppins group text-gold font-bold tracking-wider decoration-1 decoration-light_blue uppercase">{props.name}</div>

          </div>

          <div className="px-6">
            <hr className="mt-2 text-light_blue" />

            {/* <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio magni dolorem libero pariatur nisi fugit voluptate perferendis, harum sapiente sit eius excepturi, similique repellendus explicabo dicta a ipsa iure temporibus dolorum, accusantium consequatur sequi possimus! Quas non veniam aliquid et?</p> */}
            <p className="my-4 text-lg md:text-xl border-l-2 border-gold md:font-light md:leading-6  pl-2">
              {" "}
              <span className="font-bold "> TEAM</span> : {props.team}
            </p>

            <div className="flex gap-3 my-10 ">
              <p className="my-4 text-lg md:text-xl flex items-baseline  border-l-2 border-gold md:font-light md:-leading-6   pl-2">
                {" "}
                <span className="font-bold -rotate-90  w-20   "> FEES  </span>
              </p>
              <div className="border-dotted border-l-2 border-light_blue/20 ">
                <p className="my-4 text-lg md:text-xl   md:font-light md:leading-6  pl-2">
                  {props.ne}
                </p>
                <p className="my-4 text-lg md:text-xl   md:font-light md:leading-6  pl-2">
                  {props.ie}
                </p>
              </div>
            </div>

            <div className=" flex gap-3  ">
              <p className=" my-1 text-lg md:text-xl flex place-items-center   border-l-2 border-gold md:font-light md:-leading-6   pl-2">
                {" "}
                <span className="font-bold -rotate-90 w-20 "> Contacts </span>
              </p>
              <div className="border-dotted border-l-2  border-light_blue/20 ">
                <ul>
                  {
                    props.contact.map((item) => {
                      console.log(item  )
                      return (
                        <li className="my-1 px-4" >
                          <strong>{item.name} : </strong>{item.phone}
                        </li>
                      )
                    })
                  }
                  {/* <li className="my-1 px-4" >
                    <strong>Apoorvaraj : </strong>8530191073
                  </li>
                  <li className="my-1 px-4" >
                    <strong>Mrugank : </strong>7083823772
                  </li>

                  <li className="my-1 px-4" >
                    <strong>Vrushali : </strong>9766176681
                  </li>
                  <li className="my-1 px-4" >
                    <strong>Aarti : </strong>9405119460
                  </li> */}
                </ul>
              </div>
            </div>
            <br />
            {/* <button className="bg-transparent text-white hover:text-blue-300 font-semibold hover:text-green-300 px-2">View More</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function EventCards() {
  return (
    <div id="events" className="eventCards my-10 ">
      <h1 className="mt-10 mb-2 text-center capitalize text-4xl font-bold text-white">
        Events
      </h1>
      <hr className="w-1/5 mx-auto mb-5 " />
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 lg:gap-3 justify-items-center">
        {eventData.map((eva) => {
          return (
            <Card
              name={eva.name}
              logo={eva.logo}
              team={eva.members}
              ne={eva.nt}
              ie={eva.it}
              contact={eva.contact}
            />
          );
        })}
      </div>
    </div>
  );
}

export default EventCards;
