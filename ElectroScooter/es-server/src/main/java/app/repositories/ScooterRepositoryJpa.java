package app.repositories;
import app.models.Scooter;
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
public class ScooterRepositoryJpa implements EntityRepository<Scooter>{

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  public List<Scooter> findAll() {
    TypedQuery<Scooter> query = this.entityManager.createQuery(
      "select s from Scooter s", Scooter.class
    );
    return query.getResultList();
  }

  @Override
  public Scooter findById(long id) {
    return entityManager.find(Scooter.class,id);
  }

  @Override
  public Scooter save(Scooter scooter) {
    return this.entityManager.merge(scooter);
  }

  @Override
  public Scooter deleteById(long id) {
    Scooter scooter = entityManager.find(Scooter.class,id);
    entityManager.remove(scooter);
    return scooter;
  }

  @Override
  public List<Scooter> findByQuery(String jpqlName, Object... params) {
    TypedQuery<Scooter> namedQuery =
      entityManager.createNamedQuery(jpqlName, Scooter.class);
      namedQuery.setParameter(1, params[0]);

    return namedQuery.getResultList();
  }
}
