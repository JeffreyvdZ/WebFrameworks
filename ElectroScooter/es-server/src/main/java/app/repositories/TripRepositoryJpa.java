package app.repositories;
import app.models.Trip;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Primary
@Repository
public class TripRepositoryJpa implements EntityRepository<Trip>{

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  public List<Trip> findAll() {
    TypedQuery<Trip> query = this.entityManager.createQuery(
      "select s from Scooter s", Trip.class
    );
    return query.getResultList();
  }

  @Override
  public Trip findById(long id) {
    return entityManager.find(Trip.class,id);
  }

  @Override
  public Trip save(Trip trip) {
    return this.entityManager.merge(trip);
  }

  @Override
  public Trip deleteById(long id) {
    Trip trip = entityManager.find(Trip.class,id);
    entityManager.remove(trip);
    return trip;
  }

  @Override
  public List<Trip> findByQuery(String jpqlName, Object... params) {
    TypedQuery<Trip> namedQuery =
      entityManager.createNamedQuery(jpqlName, Trip.class);

    return namedQuery.getResultList();
  }
}
