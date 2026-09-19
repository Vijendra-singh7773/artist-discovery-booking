import ArtistImage from './ArtistImage'; 
import {Link} from 'react-router-dom'; 
import {MapPin,Star} from 'lucide-react'; 
import type {Artist} from '../types'; 

export default function ArtistCard({a}:{a:Artist}){
  return (
    <Link to={`/artist/${a.id}`} className="card">
      <div className="pic">
        <ArtistImage src={a.image} name={a.name}/>
        <span>{a.category}</span>
      </div>

      <div className="cardbody">
        <div className="row">
          <h3>{a.name}</h3>
          <span className="rating">
            <Star size={15} fill="currentColor"/> {a.rating}
          </span>
        </div>

        <p>
          <MapPin size={15}/> {a.city}
        </p>

        <div className="price">
          From <strong>₹{a.price.toLocaleString('en-IN')}</strong>
        </div>
      </div>
    </Link>
  );
}