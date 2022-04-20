package app.repositories;
import app.models.Scooter;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component("Mock")
public class ScootersRepositoryMock implements EntityRepository<Scooter> {

    public int id = 30000;
    public List<Scooter> scooterList = new ArrayList<>();

    public ScootersRepositoryMock(){
        for (int i = 0; i < 8; i++) {
            scooterList.add(Scooter.createSampleScooter());
        }
    }

    public int nextId(){
        return id = id + 3;
    }

    @Override
    public List<Scooter> findAll() {
      return scooterList;
    }

    @Override
    public Scooter findById(long id) {
      for (Scooter scooter : scooterList) {
        if (scooter.id == id) {
          return scooter;
        }
      }
      return null;
    }

    @Override
    public Scooter save(Scooter scooter) {
      for (int i = 0; i < scooterList.size(); i++) {
        if(scooterList.get(i).id == scooter.id){
          scooterList.set(i, scooter);
        } else if(scooter.id == 0L) {
          scooter.id = this.nextId();
          scooterList.add(scooter);
        }
      } return scooter;
    }

    @Override
    public Scooter deleteById(long id) {
      for (Scooter scooter : scooterList) {
        if (scooter.id == id) {
          scooterList.remove(scooter);
          return scooter;
        }
      }
      return null;
    }

  @Override
  public List<Scooter> findByQuery(String jpqlName, Object... params) {
    return null;
  }
}
