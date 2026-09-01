import { createContext, useContext } from 'react';

const blogs = [
  {
    id: 1,
    title: "Trying and searching and wanting",
    description: "I am sitting on my balcony. It is spring and there is a little bit of heat in the sun. The balcony looks out over a road. The road is usually busy… an endless stream of trucks and cars but right now there is no traffic. Everyone is self-isolating. The machine has stopped. It feels strange. Peaceful. I can hear different birds… the wren, the blackbird, the robin. A blue tit is flitting from one branch to the next. Life goes on. I could sit here all day.",
    image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 2,
    title: "Connecting to Care",
    description: "You are walking through town at night and you see your best friend looking dishevelled, sleeping rough on the street. You haven’t seen him for six months. There is probably an initial shock: “Oh my God, what happened?!!” You instinctively reach out for him. Before you know it your arm is on his shoulder: “Come home with me. Let me take care of you”. Now another night. This time you see a random stranger looking dishevelled, sleeping rough on the street. Be honest. What do you do? Is it someone else’s problem? If your heart is big enough you might give him some money or buy him a sandwich but is he coming home to sleep on your couch? Perhaps you rationalise your inaction by reminding yourself that you donate to the local homeless charity. You might remind yourself to vote for a politician who appears committed to doing something. But most of the time most of us don’t do anything at all.",
    image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 3,
    title: "Nature is a teacher",
    description: "A number of years ago I went on holiday to a beautiful part of Portugal. We stayed in a converted farmhouse in the middle of a national park. The farmhouse was in a valley. We arrived in the evening when the birds were just starting to roost. It was still warm and the air smelled sweet with pollen. You could hear the hum of crickets. A small river flowed through that valley. We opened a rickety gate and crossed a small wooden bridge. As we walked along the narrow path that led to our house I had a clear vision of what my morning routine would be like for the next fourteen days. I had been working hard for the last few months and I felt tired. I wanted this holiday to be a mini retreat. I would wake up early each day when it was still quite cool and I would meditate for a while. I imagined myself sitting in a peaceful spot, my mind calm, my body relaxed… listening to the river flowing, hearing the birds and wildlife starting to stir, feeling the first rays of the early morning sun hit my face as it rose over the top of the hill. Present. Even as I write this now, it sounds like paradise to me.",
    image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg"
  },
  {
    id: 4,
    title: "The hug of homecoming",
    description: "Growing up in the modern developed world we can easily come to believe that towns and cities – the urban and artificial environment – is where we naturally belong. But our brains and bodies, which evolved over thousands of years, were designed by and designed for an environment very different to the one we live in now.Throughout our evolutionary history we lived in very close connection to the land, with a very close kinship with other creatures. Our physiological system evolved to survive in wild, natural environments and developed a love and kinship for these places that lives on in our DNA.",
    image: "https://thumbs.dreamstime.com/front/img/landings/photos/288408911.jpg"
  },
  {
    id: 5,
    title: "Seeing with “fresh eyes”",
    description: "I was working as a lawyer at the time and I used to walk down a little lane way to the train station on my commute to work. It’s not an especially beautiful lane way – a concrete footpath, metal gates on one side and some shrubs and bushes on the other side. I must have walked this exact same route a thousand times before.",
    image: "https://plus.unsplash.com/premium_photo-1669927131902-a64115445f0f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmlnaHQlMjBjaXR5fGVufDB8fDB8fHww"
  }
];

export const BlogContext = createContext([]);

export const useBlogs = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => { 
  return (
    <BlogContext.Provider value={blogs}>
      {children}
    </BlogContext.Provider>
  );
};
