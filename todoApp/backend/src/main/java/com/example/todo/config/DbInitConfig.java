import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

@Configuration
public class DbInitConfig {

    @Bean
    public CommandLineRunner enforceNotNull(DataSource dataSource) {
    return args -> {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {

            stmt.execute("ALTER TABLE todos ALTER COLUMN completed_at DROP NOT NULL");

        } catch (Exception e) {
            System.err.println("❌ " + e.getMessage());
        }
    };
}
}
