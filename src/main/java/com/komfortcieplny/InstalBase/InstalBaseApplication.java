package com.komfortcieplny.InstalBase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@SpringBootApplication
public class InstalBaseApplication {

	public static void main(String[] args) {
		SpringApplication.run(InstalBaseApplication.class, args);
	}

}
