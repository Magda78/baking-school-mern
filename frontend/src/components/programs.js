import { data } from '../data/data';
import Program from './program';

function Programs() {
    return (
      <section className="bg-midium-blue py-[47px] px-[154px] grid sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 xl:gap-y-8 xl:justify-items-center xl:gap-x-8">
        {data?.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`${
                index === 2 ? 'col-span-2' : 'col-span-1'
              }`}
            >
              <Program
                name={item.name}
                description={item.description}
                price={item.price}
              />
            </div>
          );
        })}
      </section>
    );
  }
  
  export default Programs;
