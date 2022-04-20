package app.repositories;
import java.util.List;

public interface EntityRepository<E> {
  List<E> findAll();
  E findById(long id);
  E save(E object);
  E deleteById(long id);

  List<E> findByQuery(String jpqlName, Object... params);
  // finds all instances from a named jpql-query

}
